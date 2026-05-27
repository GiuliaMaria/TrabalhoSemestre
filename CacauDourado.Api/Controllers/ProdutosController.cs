using Microsoft.AspNetCore.Mvc;
using CacauDourado.Api.Models;
using CacauDourado.Api.Services;

namespace CacauDourado.Api.Controllers;

[ApiController]
[Route("produtos")]
public class ProdutosController : ControllerBase
{
    private readonly ProdutoService _produtoService;

    public ProdutosController(ProdutoService produtoService)
    {
        _produtoService = produtoService;
    }

    [HttpGet]
    public async Task<List<Produto>> Get() =>
        await _produtoService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Produto>> Get(string id)
    {
        var produto = await _produtoService.GetAsync(id);

        if (produto is null)
            return NotFound();

        return produto;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Produto novoProduto)
    {
        await _produtoService.CreateAsync(novoProduto);

        return Ok(novoProduto);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Produto produtoAtualizado)
    {
        var produto = await _produtoService.GetAsync(id);

        if (produto is null)
            return NotFound();

        produtoAtualizado.Id = produto.Id;

        await _produtoService.UpdateAsync(id, produtoAtualizado);

        return Ok(produtoAtualizado);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var produto = await _produtoService.GetAsync(id);

        if (produto is null)
            return NotFound();

        await _produtoService.RemoveAsync(id);

        return Ok();
    }
}