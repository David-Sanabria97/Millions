using Microsoft.AspNetCore.Mvc;
using PropertyAPI.Application.UseCases;
using Microsoft.Extensions.Logging;

namespace PropertyAPI.Controllers;

[ApiController]
[Route("api/properties")]
public class PropertiesController : ControllerBase
{
    private readonly GetPropertyDetailUseCase _useCase;


    public PropertiesController(GetPropertyDetailUseCase useCase)
    {
        _useCase = useCase;

    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? name, [FromQuery] string? address, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
    {

        var result = await _useCase.Execute(name, address, minPrice, maxPrice);
        if(result == null ) return NotFound();
        return Ok(result);
    }
}