using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.Entities;
using AdditiveIndex.Api.Models.DTOs;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DiscussionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public DiscussionsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DiscussionDto>>> GetAll()
    {
        var items = await _context.Discussions
            .AsNoTracking()
            .OrderByDescending(d => d.CreatedAt)
            .Select(d => MapToDto(d))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DiscussionDto>> GetById(int id)
    {
        var discussion = await _context.Discussions
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == id);

        if (discussion is null)
            return NotFound();

        return Ok(MapToDto(discussion));
    }

    [HttpPost]
    public async Task<ActionResult<DiscussionDto>> Create(CreateDiscussionDto dto)
    {
        var discussion = new Discussion
        {
            Username = dto.Username,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.Discussions.Add(discussion);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = discussion.Id },
            MapToDto(discussion));
    }

    private static DiscussionDto MapToDto(Discussion d) => new()
    {
        Id = d.Id,
        Username = d.Username,
        Message = d.Message,
        CreatedAt = d.CreatedAt
    };
}
