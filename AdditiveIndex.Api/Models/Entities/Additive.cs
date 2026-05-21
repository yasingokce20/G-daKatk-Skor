namespace AdditiveIndex.Api.Models.Entities;

public enum RiskLevel
{
    Safe,
    Low,
    Moderate,
    High,
    Banned
}

public class Additive
{
    public int Id { get; set; }
    public string ECode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? AlternativeNames { get; set; }
    public string? Description { get; set; }
    public string? Function { get; set; }
    public RiskLevel RiskLevel { get; set; } = RiskLevel.Safe;
    public string? Source { get; set; }
    public string? SourceDetails { get; set; }
    public string? AdiBySafety { get; set; }
    public string? RegulatoryStatus { get; set; }
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<AdditiveProduct> AdditiveProducts { get; set; } = new List<AdditiveProduct>();
    public ICollection<Reference> References { get; set; } = new List<Reference>();
}
