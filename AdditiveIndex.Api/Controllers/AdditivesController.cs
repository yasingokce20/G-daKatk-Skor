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
    public async Task<ActionResult<IEnumerable<AdditiveDto>>> GetAll(
        [FromQuery] string? riskLevel,
        [FromQuery] string? search)
    {
        var query = _context.Additives.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(riskLevel)
            && Enum.TryParse<RiskLevel>(riskLevel, true, out var rl))
        {
            query = query.Where(a => a.RiskLevel == rl);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(a =>
                a.Name.ToLower().Contains(term) ||
                a.ECode.ToLower().Contains(term));
        }

        var items = await query
            .OrderBy(a => a.ECode)
            .Select(a => MapToDto(a))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AdditiveDto>> GetById(int id)
    {
        var additive = await _context.Additives
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);

        if (additive is null)
            return NotFound();

        return Ok(MapToDto(additive));
    }

    [HttpGet("by-code/{eCode}")]
    public async Task<ActionResult<AdditiveDto>> GetByECode(string eCode)
    {
        var additive = await _context.Additives
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.ECode.ToLower() == eCode.ToLower());

        if (additive is null)
            return NotFound();

        return Ok(MapToDto(additive));
    }

    [HttpPost]
    public async Task<ActionResult<AdditiveDto>> Create(CreateAdditiveDto dto)
    {
        if (!Enum.TryParse<RiskLevel>(dto.RiskLevel, true, out var rl))
            rl = RiskLevel.Unknown;

        var additive = new Additive
        {
            Name = dto.Name,
            ECode = dto.ECode,
            RiskLevel = rl,
            Source = dto.Source,
            Description = dto.Description,
            ScientificReferences = dto.ScientificReferences,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Additives.Add(additive);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = additive.Id },
            MapToDto(additive));
    }

    private static AdditiveDto MapToDto(Additive a) => new()
    {
        Id = a.Id,
        Name = a.Name,
        ECode = a.ECode,
        RiskLevel = a.RiskLevel.ToString(),
        Source = a.Source,
        Description = a.Description,
        ScientificReferences = a.ScientificReferences,
        CreatedAt = a.CreatedAt,
        UpdatedAt = a.UpdatedAt
    };
}
