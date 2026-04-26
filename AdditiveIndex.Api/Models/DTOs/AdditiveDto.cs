namespace AdditiveIndex.Api.Models.DTOs;

public class AdditiveDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ECode { get; set; } = string.Empty;
    public string RiskLevel { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? Description { get; set; }
    public string? ScientificReferences { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateAdditiveDto
{
    public string Name { get; set; } = string.Empty;
    public string ECode { get; set; } = string.Empty;
    public string RiskLevel { get; set; } = "Unknown";
    public string? Source { get; set; }
    public string? Description { get; set; }
    public string? ScientificReferences { get; set; }
}
