using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Services;

public class OffDataImporter
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContext _dbContext;
    private readonly ILogger<OffDataImporter> _logger;

    public OffDataImporter(IHttpClientFactory httpClientFactory, AppDbContext dbContext, ILogger<OffDataImporter> logger)
    {
        _httpClient = httpClientFactory.CreateClient("OffApi");
        _dbContext = dbContext;
        _logger = logger;
    }

    /// <summary>
    /// Fetches a single product from OFF by barcode, saves it locally,
    /// and links it to existing additives via the junction table.
    /// </summary>
    public async Task ImportProductAsync(string barcode, CancellationToken ct = default)
    {
        try
        {
            var response = await _httpClient.GetAsync($"api/v0/product/{barcode}.json", ct);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync(ct);
            using var doc = JsonDocument.Parse(json);

            if (!doc.RootElement.TryGetProperty("product", out var product))
            {
                _logger.LogWarning("Product not found for barcode {Barcode}", barcode);
                return;
            }

            // Extract product details
            var name = product.TryGetProperty("product_name", out var pn) ? pn.GetString() : null;
            var brand = product.TryGetProperty("brands", out var b) ? b.GetString() : null;
            var imageUrl = product.TryGetProperty("image_url", out var img) ? img.GetString() : null;

            // Upsert product
            var existingProduct = await _dbContext.Products
                .FirstOrDefaultAsync(p => p.Barcode == barcode, ct);

            if (existingProduct is null)
            {
                existingProduct = new Product
                {
                    Barcode = barcode,
                    Name = name ?? "Unknown",
                    Brand = brand ?? "Unknown",
                    ImageUrl = imageUrl,
                    CreatedAt = DateTime.UtcNow
                };
                _dbContext.Products.Add(existingProduct);
            }
            else
            {
                existingProduct.Name = name ?? existingProduct.Name;
                existingProduct.Brand = brand ?? existingProduct.Brand;
                existingProduct.ImageUrl = imageUrl ?? existingProduct.ImageUrl;
                _dbContext.Products.Update(existingProduct);
            }

            await _dbContext.SaveChangesAsync(ct);

            // Link additives
            if (product.TryGetProperty("additives_tags", out var additives))
            {
                foreach (var additiveTag in additives.EnumerateArray())
                {
                    var tag = additiveTag.GetString();
                    if (string.IsNullOrWhiteSpace(tag)) continue;

                    var eCode = tag.ToUpperInvariant().Replace("EN:", "").Trim();

                    var additive = await _dbContext.Additives
                        .FirstOrDefaultAsync(a => a.ECode.ToLower() == eCode.ToLower(), ct);

                    if (additive is null)
                    {
                        _logger.LogWarning("Additive {ECode} not found in local DB; skipping link.", eCode);
                        continue;
                    }

                    var existingLink = await _dbContext.AdditiveProducts
                        .FirstOrDefaultAsync(
                            ap => ap.AdditiveId == additive.Id && ap.ProductId == existingProduct.Id, ct);

                    if (existingLink is null)
                    {
                        _dbContext.AdditiveProducts.Add(new AdditiveProduct
                        {
                            AdditiveId = additive.Id,
                            ProductId = existingProduct.Id
                        });
                        _logger.LogInformation("Linked {Barcode} -> {ECode}", barcode, eCode);
                    }
                }
            }

            await _dbContext.SaveChangesAsync(ct);
            _logger.LogInformation("Successfully imported product {Barcode}", barcode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to import product {Barcode}", barcode);
        }
    }

    /// <summary>
    /// Stub: Search OFF for products containing a specific additive E-code.
    /// </summary>
    public async Task<List<string>> SearchProductsByAdditiveAsync(string eCode, int pageSize = 20, CancellationToken ct = default)
    {
        // OFF search API: https://world.openfoodfacts.org/cgi/search.pl?additives_tags=en:{ecode}&page_size=20&json=1
        var tag = eCode.ToLowerInvariant().Replace("e", "");
        var url = $"cgi/search.pl?additives_tags=en:e{tag}&page_size={pageSize}&json=1";

        try
        {
            var response = await _httpClient.GetAsync(url, ct);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync(ct);
            using var doc = JsonDocument.Parse(json);

            var products = new List<string>();
            if (doc.RootElement.TryGetProperty("products", out var prodArray))
            {
                foreach (var p in prodArray.EnumerateArray())
                {
                    var name = p.GetProperty("product_name").GetString()
                               ?? p.GetProperty("code").GetString()
                               ?? "Unknown";
                    products.Add(name);
                }
            }

            return products;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to search products for additive {ECode}", eCode);
            return new List<string>();
        }
    }
}
