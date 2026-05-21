namespace AdditiveIndex.Api.Models.DTOs;

// ── Pagination ──
public class PaginationDto
{
    public int Page { get; set; }
    public int Limit { get; set; }
    public int Total { get; set; }
    public int TotalPages { get; set; }
}

// ── Category ──
public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ECodeRange { get; set; }
}

// ── Reference ──
public class ReferenceDto
{
    public int Id { get; set; }
    public int AdditiveId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Authors { get; set; }
    public string? Journal { get; set; }
    public int? Year { get; set; }
    public string? Doi { get; set; }
    public string? Url { get; set; }
    public string? Source { get; set; }
    public string? Summary { get; set; }
}

public class CreateReferenceDto
{
    public int AdditiveId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Authors { get; set; }
    public string? Journal { get; set; }
    public int? Year { get; set; }
    public string? Doi { get; set; }
    public string? Url { get; set; }
    public string? Source { get; set; }
    public string? Summary { get; set; }
}

// ── Additive ──
public class AdditiveDto
{
    public int Id { get; set; }
    public string ECode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? AlternativeNames { get; set; }
    public string? Description { get; set; }
    public string? Function { get; set; }
    public string RiskLevel { get; set; } = string.Empty;
    public string? Source { get; set; }
    public string? SourceDetails { get; set; }
    public string? AdiBySafety { get; set; }
    public string? RegulatoryStatus { get; set; }
    public int? CategoryId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class AdditiveDetailDto : AdditiveDto
{
    public CategoryDto? Category { get; set; }
    public List<ReferenceDto> References { get; set; } = new();
}

public class AdditiveListResponseDto
{
    public List<AdditiveDto> Data { get; set; } = new();
    public PaginationDto Pagination { get; set; } = new();
}

public class CreateAdditiveDto
{
    public string ECode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? AlternativeNames { get; set; }
    public string? Description { get; set; }
    public string? Function { get; set; }
    public string RiskLevel { get; set; } = "Safe";
    public string? Source { get; set; }
    public string? SourceDetails { get; set; }
    public string? AdiBySafety { get; set; }
    public string? RegulatoryStatus { get; set; }
    public int? CategoryId { get; set; }
}

// ── Product ──
public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string? ProductCategory { get; set; }
    public string? Barcode { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ProductDetailDto : ProductDto
{
    public List<AdditiveDto> Additives { get; set; } = new();
}

public class ProductListResponseDto
{
    public List<ProductDto> Data { get; set; } = new();
    public PaginationDto Pagination { get; set; } = new();
}

// ── Stats ──
public class StatsOverviewDto
{
    public int TotalAdditives { get; set; }
    public int TotalCategories { get; set; }
    public int TotalReferences { get; set; }
    public Dictionary<string, int> ByRiskLevel { get; set; } = new();
    public DateTime LastUpdated { get; set; }
}

public class RiskDistributionItemDto
{
    public string RiskLevel { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}

public class CategoryDistributionItemDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public int Count { get; set; }
}

// ── Error ──
public class ErrorResponseDto
{
    public string Error { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public int StatusCode { get; set; }
}
