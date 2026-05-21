using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.Entities;
using AdditiveIndex.Api.Models.DTOs;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdditivesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdditivesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<AdditiveListResponseDto>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int limit = 20,
        [FromQuery] string? search = null,
        [FromQuery] string? riskLevel = null,
        [FromQuery] int? categoryId = null,
        [FromQuery] string? source = null,
        [FromQuery] string sortBy = "eCode",
        [FromQuery] string sortOrder = "asc")
    {
        page = Math.Max(1, page);
        limit = Math.Clamp(limit, 1, 100);

        var query = _context.Additives.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(riskLevel)
            && Enum.TryParse<RiskLevel>(riskLevel, true, out var rl))
            query = query.Where(a => a.RiskLevel == rl);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(a =>
                a.Name.ToLower().Contains(term) ||
                a.ECode.ToLower().Contains(term) ||
                (a.AlternativeNames != null && a.AlternativeNames.ToLower().Contains(term)));
        }

        if (categoryId.HasValue)
            query = query.Where(a => a.CategoryId == categoryId.Value);

        if (!string.IsNullOrWhiteSpace(source))
            query = query.Where(a => a.Source != null && a.Source.ToLower() == source.ToLower());

        var total = await query.CountAsync();

        query = sortBy.ToLower() switch
        {
            "name" => sortOrder == "desc" ? query.OrderByDescending(a => a.Name) : query.OrderBy(a => a.Name),
            "risklevel" => sortOrder == "desc" ? query.OrderByDescending(a => a.RiskLevel) : query.OrderBy(a => a.RiskLevel),
            "createdat" => sortOrder == "desc" ? query.OrderByDescending(a => a.CreatedAt) : query.OrderBy(a => a.CreatedAt),
            _ => sortOrder == "desc" ? query.OrderByDescending(a => a.ECode) : query.OrderBy(a => a.ECode),
        };

        var items = await query
            .Skip((page - 1) * limit)
            .Take(limit)
            .Select(a => MapToDto(a))
            .ToListAsync();

        return Ok(new AdditiveListResponseDto
        {
            Data = items,
            Pagination = new PaginationDto
            {
                Page = page,
                Limit = limit,
                Total = total,
                TotalPages = (int)Math.Ceiling(total / (double)limit)
            }
        });
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AdditiveDetailDto>> GetById(int id)
    {
        var additive = await _context.Additives
            .AsNoTracking()
            .Include(a => a.Category)
            .Include(a => a.References)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (additive is null)
            return NotFound(new ErrorResponseDto { Error = "Not Found", Message = "Katkı maddesi bulunamadı", StatusCode = 404 });

        return Ok(MapToDetailDto(additive));
    }

    [HttpGet("by-ecode/{eCode}")]
    public async Task<ActionResult<AdditiveDetailDto>> GetByECode(string eCode)
    {
        var additive = await _context.Additives
            .AsNoTracking()
            .Include(a => a.Category)
            .Include(a => a.References)
            .FirstOrDefaultAsync(a => a.ECode.ToLower() == eCode.ToLower());

        if (additive is null)
            return NotFound(new ErrorResponseDto { Error = "Not Found", Message = $"E kodu '{eCode}' bulunamadı", StatusCode = 404 });

        return Ok(MapToDetailDto(additive));
    }

    [HttpPost]
    public async Task<ActionResult<AdditiveDto>> Create(CreateAdditiveDto dto)
    {
        if (!Enum.TryParse<RiskLevel>(dto.RiskLevel, true, out var rl))
            rl = RiskLevel.Safe;

        var existing = await _context.Additives.AnyAsync(a => a.ECode == dto.ECode);
        if (existing)
            return Conflict(new ErrorResponseDto { Error = "Conflict", Message = $"E kodu '{dto.ECode}' zaten mevcut", StatusCode = 409 });

        var additive = new Additive
        {
            ECode = dto.ECode,
            Name = dto.Name,
            AlternativeNames = dto.AlternativeNames,
            Description = dto.Description,
            Function = dto.Function,
            RiskLevel = rl,
            Source = dto.Source,
            SourceDetails = dto.SourceDetails,
            AdiBySafety = dto.AdiBySafety,
            RegulatoryStatus = dto.RegulatoryStatus,
            CategoryId = dto.CategoryId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Additives.Add(additive);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = additive.Id }, MapToDto(additive));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<AdditiveDto>> Update(int id, CreateAdditiveDto dto)
    {
        var additive = await _context.Additives.FindAsync(id);
        if (additive is null)
            return NotFound(new ErrorResponseDto { Error = "Not Found", Message = "Katkı maddesi bulunamadı", StatusCode = 404 });

        if (!Enum.TryParse<RiskLevel>(dto.RiskLevel, true, out var rl))
            rl = RiskLevel.Safe;

        additive.ECode = dto.ECode;
        additive.Name = dto.Name;
        additive.AlternativeNames = dto.AlternativeNames;
        additive.Description = dto.Description;
        additive.Function = dto.Function;
        additive.RiskLevel = rl;
        additive.Source = dto.Source;
        additive.SourceDetails = dto.SourceDetails;
        additive.AdiBySafety = dto.AdiBySafety;
        additive.RegulatoryStatus = dto.RegulatoryStatus;
        additive.CategoryId = dto.CategoryId;
        additive.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(MapToDto(additive));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var additive = await _context.Additives.FindAsync(id);
        if (additive is null)
            return NotFound(new ErrorResponseDto { Error = "Not Found", Message = "Katkı maddesi bulunamadı", StatusCode = 404 });

        _context.Additives.Remove(additive);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    internal static AdditiveDto MapToDto(Additive a) => new()
    {
        Id = a.Id,
        ECode = a.ECode,
        Name = a.Name,
        AlternativeNames = a.AlternativeNames,
        Description = a.Description,
        Function = a.Function,
        RiskLevel = a.RiskLevel.ToString().ToLower(),
        Source = a.Source,
        SourceDetails = a.SourceDetails,
        AdiBySafety = a.AdiBySafety,
        RegulatoryStatus = a.RegulatoryStatus,
        CategoryId = a.CategoryId,
        CreatedAt = a.CreatedAt,
        UpdatedAt = a.UpdatedAt
    };

    private static AdditiveDetailDto MapToDetailDto(Additive a)
    {
        var dto = new AdditiveDetailDto
        {
            Id = a.Id,
            ECode = a.ECode,
            Name = a.Name,
            AlternativeNames = a.AlternativeNames,
            Description = a.Description,
            Function = a.Function,
            RiskLevel = a.RiskLevel.ToString().ToLower(),
            Source = a.Source,
            SourceDetails = a.SourceDetails,
            AdiBySafety = a.AdiBySafety,
            RegulatoryStatus = a.RegulatoryStatus,
            CategoryId = a.CategoryId,
            CreatedAt = a.CreatedAt,
            UpdatedAt = a.UpdatedAt,
            Category = a.Category is not null ? new CategoryDto
            {
                Id = a.Category.Id,
                Name = a.Category.Name,
                Description = a.Category.Description,
                ECodeRange = a.Category.ECodeRange
            } : null,
            References = a.References?.Select(r => new ReferenceDto
            {
                Id = r.Id,
                AdditiveId = r.AdditiveId,
                Title = r.Title,
                Authors = r.Authors,
                Journal = r.Journal,
                Year = r.Year,
                Doi = r.Doi,
                Url = r.Url,
                Source = r.Source,
                Summary = r.Summary
            }).ToList() ?? new()
        };
        return dto;
    }
}
