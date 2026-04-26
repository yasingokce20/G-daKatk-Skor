namespace AdditiveIndex.Api.Models.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Barcode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Brand { get; set; }
    public string? ImageUrl { get; set; }
}

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
    public List<ProductDto> Products { get; set; } = new();
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
