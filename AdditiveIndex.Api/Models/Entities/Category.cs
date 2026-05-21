namespace AdditiveIndex.Api.Models.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ECodeRange { get; set; }

    public ICollection<Additive> Additives { get; set; } = new List<Additive>();
}
