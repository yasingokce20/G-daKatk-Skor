using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.DTOs;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api/stats")]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StatsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("overview")]
    public async Task<ActionResult<StatsOverviewDto>> GetOverview()
    {
        var totalAdditives = await _context.Additives.CountAsync();
        var totalCategories = await _context.Categories.CountAsync();
        var totalReferences = await _context.References.CountAsync();

        var riskCounts = await _context.Additives
            .GroupBy(a => a.RiskLevel)
            .Select(g => new { RiskLevel = g.Key, Count = g.Count() })
            .ToListAsync();

        var byRiskLevel = riskCounts.ToDictionary(
            r => r.RiskLevel.ToString().ToLower(),
            r => r.Count);

        return Ok(new StatsOverviewDto
        {
            TotalAdditives = totalAdditives,
            TotalCategories = totalCategories,
            TotalReferences = totalReferences,
            ByRiskLevel = byRiskLevel,
            LastUpdated = DateTime.UtcNow
        });
    }

    [HttpGet("risk-distribution")]
    public async Task<ActionResult<IEnumerable<RiskDistributionItemDto>>> GetRiskDistribution()
    {
        var total = await _context.Additives.CountAsync();
        var riskCounts = await _context.Additives
            .GroupBy(a => a.RiskLevel)
            .Select(g => new { RiskLevel = g.Key, Count = g.Count() })
            .ToListAsync();

        var result = riskCounts.Select(r => new RiskDistributionItemDto
        {
            RiskLevel = r.RiskLevel.ToString().ToLower(),
            Count = r.Count,
            Percentage = total > 0 ? Math.Round(r.Count / (double)total * 100, 1) : 0
        });

        return Ok(result);
    }

    [HttpGet("category-distribution")]
    public async Task<ActionResult<IEnumerable<CategoryDistributionItemDto>>> GetCategoryDistribution()
    {
        var result = await _context.Categories
            .AsNoTracking()
            .Select(c => new CategoryDistributionItemDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                Count = c.Additives.Count
            })
            .OrderBy(c => c.CategoryName)
            .ToListAsync();

        return Ok(result);
    }
}
