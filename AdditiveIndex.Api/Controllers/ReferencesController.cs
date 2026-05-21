using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.Entities;
using AdditiveIndex.Api.Models.DTOs;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferencesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReferencesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReferenceDto>>> GetAll([FromQuery] int? additiveId)
    {
        var query = _context.References.AsNoTracking().AsQueryable();

        if (additiveId.HasValue)
            query = query.Where(r => r.AdditiveId == additiveId.Value);

        var items = await query
            .Select(r => new ReferenceDto
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
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<ReferenceDto>> Create(CreateReferenceDto dto)
    {
        var reference = new Reference
        {
            AdditiveId = dto.AdditiveId,
            Title = dto.Title,
            Authors = dto.Authors,
            Journal = dto.Journal,
            Year = dto.Year,
            Doi = dto.Doi,
            Url = dto.Url,
            Source = dto.Source,
            Summary = dto.Summary
        };

        _context.References.Add(reference);
        await _context.SaveChangesAsync();

        return StatusCode(201, new ReferenceDto
        {
            Id = reference.Id,
            AdditiveId = reference.AdditiveId,
            Title = reference.Title,
            Authors = reference.Authors,
            Journal = reference.Journal,
            Year = reference.Year,
            Doi = reference.Doi,
            Url = reference.Url,
            Source = reference.Source,
            Summary = reference.Summary
        });
    }
}
