console.log("SCRIPT CARREGOU");

const apiProdutos = "http://localhost:5092/produtos";
const apiCategorias = "http://localhost:5092/categorias";

async function buscarProdutos() {

    const respostaProdutos = await fetch(apiProdutos);
    const produtos = await respostaProdutos.json();

    const respostaCategorias = await fetch(apiCategorias);
    const categorias = await respostaCategorias.json();

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const categoria = categorias.find(c =>
            c.id === produto.categoriaId
        );

        lista.innerHTML += `
            <div class="card">
                <h3>${produto.nome}</h3>

                <p>Preço: R$ ${produto.preco}</p>

                <p>
                    Categoria:
                    ${categoria ? categoria.nome : "Não encontrada"}
                </p>
            </div>
        `;
    });
}

async function cadastrarProduto() {

    const nome = document.getElementById("nome").value;

    const preco = parseFloat(
        document.getElementById("preco").value
    );

    const categoriaId =
        document.getElementById("categoriaId").value;

    const produto = {
        nome,
        preco,
        categoriaId
    };

    await fetch(apiProdutos, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(produto)
    });

    buscarProdutos();
}

buscarProdutos();