using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Models.DTOs;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("products")]
    public async Task<ActionResult<ProductListResponseDto>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int limit = 20,
        [FromQuery] string? search = null,
        [FromQuery] string? productCategory = null,
        [FromQuery] string? brand = null)
    {
        page = Math.Max(1, page);
        limit = Math.Clamp(limit, 1, 100);

        var query = _context.Products.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(p =>
                p.Name.ToLower().Contains(term) ||
                p.Brand.ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(productCategory))
        {
            var cat = productCategory.Trim().ToLower();
            query = query.Where(p => p.ProductCategory != null && p.ProductCategory.ToLower().Contains(cat));
        }

        if (!string.IsNullOrWhiteSpace(brand))
        {
            var b = brand.Trim().ToLower();
            query = query.Where(p => p.Brand.ToLower().Contains(b));
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(p => p.Name)
            .Skip((page - 1) * limit)
            .Take(limit)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Brand = p.Brand,
                ProductCategory = p.ProductCategory,
                Barcode = p.Barcode,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();

        return Ok(new ProductListResponseDto
        {
            Data = items,
            Pagination = new PaginationDto
            {
                Page = page,
                Limit = limit,
                Total = total,
                TotalPages = (int)Math.Ceiling(total / (double)limit)
            }
        });
    }

    [HttpGet("products/{id:int}")]
    public async Task<ActionResult<ProductDetailDto>> GetById(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .Include(p => p.AdditiveProducts)
                .ThenInclude(ap => ap.Additive)
                    .ThenInclude(a => a.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product is null)
            return NotFound(new ErrorResponseDto { Error = "Not Found", Message = "Ürün bulunamadı", StatusCode = 404 });

        return Ok(new ProductDetailDto
        {
            Id = product.Id,
            Name = product.Name,
            Brand = product.Brand,
            ProductCategory = product.ProductCategory,
            Barcode = product.Barcode,
            Description = product.Description,
            ImageUrl = product.ImageUrl,
            CreatedAt = product.CreatedAt,
            Additives = product.AdditiveProducts.Select(ap =>
            {
                var dto = AdditivesController.MapToDto(ap.Additive);
                return dto;
            }).ToList()
        });
    }

    [HttpGet("additives/{id:int}/products")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByAdditive(int id)
    {
        var products = await _context.AdditiveProducts
            .AsNoTracking()
            .Where(ap => ap.AdditiveId == id)
            .Include(ap => ap.Product)
            .Select(ap => new ProductDto
            {
                Id = ap.Product.Id,
                Name = ap.Product.Name,
                Brand = ap.Product.Brand,
                ProductCategory = ap.Product.ProductCategory,
                Barcode = ap.Product.Barcode,
                Description = ap.Product.Description,
                ImageUrl = ap.Product.ImageUrl,
                CreatedAt = ap.Product.CreatedAt
            })
            .OrderBy(p => p.Name)
            .ToListAsync();

        return Ok(products);
    }
}
