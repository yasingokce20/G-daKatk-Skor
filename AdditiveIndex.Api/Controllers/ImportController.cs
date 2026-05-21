using Microsoft.AspNetCore.Mvc;
using AdditiveIndex.Api.Services;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImportController : ControllerBase
{
    private readonly OffDataImporter _importer;
    private readonly ILogger<ImportController> _logger;

    public ImportController(OffDataImporter importer, ILogger<ImportController> logger)
    {
        _importer = importer;
        _logger = logger;
    }

    /// <summary>
    /// Import a single product from Open Food Facts by barcode.
    /// </summary>
    [HttpPost("product/{barcode}")]
    public async Task<ActionResult> ImportProduct(string barcode)
    {
        if (string.IsNullOrWhiteSpace(barcode))
            return BadRequest(new { message = "Barcode is required." });

        await _importer.ImportProductAsync(barcode);
        return Ok(new { message = $"Import triggered for barcode {barcode}." });
    }
}
