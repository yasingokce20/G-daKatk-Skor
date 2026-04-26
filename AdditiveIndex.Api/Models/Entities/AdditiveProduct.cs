namespace AdditiveIndex.Api.Models.Entities;

public class AdditiveProduct
{
    public int AdditiveId { get; set; }
    public Additive Additive { get; set; } = null!;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
}
