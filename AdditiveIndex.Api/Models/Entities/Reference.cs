namespace AdditiveIndex.Api.Models.Entities;

public class Reference
{
    public int Id { get; set; }
    public int AdditiveId { get; set; }
    public Additive Additive { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public string? Authors { get; set; }
    public string? Journal { get; set; }
    public int? Year { get; set; }
    public string? Doi { get; set; }
    public string? Url { get; set; }
    public string? Source { get; set; }
    public string? Summary { get; set; }
}
