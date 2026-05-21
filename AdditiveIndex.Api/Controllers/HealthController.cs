using Microsoft.AspNetCore.Mvc;

namespace AdditiveIndex.Api.Controllers;

[ApiController]
[Route("api")]
public class HealthController : ControllerBase
{
    [HttpGet("healthz")]
    public IActionResult HealthCheck()
    {
        return Ok(new { status = "ok" });
    }
}
