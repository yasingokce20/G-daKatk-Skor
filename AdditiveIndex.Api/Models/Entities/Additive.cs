namespace AdditiveIndex.Api.Models.Entities;

public enum RiskLevel
{
    Unknown,
    None,
    Low,
    Medium,
    High
}

public class Additive
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ECode { get; set; } = string.Empty;
    public RiskLevel RiskLevel { get; set; } = RiskLevel.Unknown;
    public string? Source { get; set; }
    public string? Description { get; set; }
    public string? ScientificReferences { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
