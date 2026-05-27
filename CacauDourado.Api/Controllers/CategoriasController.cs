using CacauDourado.Api.Models;
using CacauDourado.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CacauDourado.Api.Controllers;

[ApiController]
[Route("categorias")]
public class CategoriasController : ControllerBase
{
    private readonly CategoriaService _categoriaService;

    public CategoriasController(CategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Categoria>>> Get()
    {
        var categorias = await _categoriaService.GetAsync();

        return Ok(categorias);
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Categoria>> GetById(string id)
    {
        var categoria = await _categoriaService.GetByIdAsync(id);

        if (categoria is null)
        {
            return NotFound();
        }

        return Ok(categoria);
    }

    [HttpPost]
    public async Task<ActionResult> Create(Categoria categoria)
    {
        await _categoriaService.CreateAsync(categoria);

        return CreatedAtAction(
            nameof(GetById),
            new { id = categoria.Id },
            categoria);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<ActionResult> Update(string id, Categoria categoria)
    {
        var categoriaExistente =
            await _categoriaService.GetByIdAsync(id);

        if (categoriaExistente is null)
        {
            return NotFound();
        }

        categoria.Id = categoriaExistente.Id;

        await _categoriaService.UpdateAsync(id, categoria);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<ActionResult> Delete(string id)
    {
        var categoria =
            await _categoriaService.GetByIdAsync(id);

        if (categoria is null)
        {
            return NotFound();
        }

        await _categoriaService.DeleteAsync(id);

        return NoContent();
    }
}