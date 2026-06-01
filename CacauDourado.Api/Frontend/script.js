const apiProdutos = "http://localhost:5092/produtos";
const apiCategorias = "http://localhost:5092/categorias";

async function carregarCategoriasSelect() {

    const resposta =
        await fetch(apiCategorias);

    const categorias =
        await resposta.json();

    const select =
        document.getElementById("categoriaId");

    select.innerHTML =
        '<option value="">Selecione uma categoria</option>';

    categorias.forEach(categoria => {

        select.innerHTML += `
            <option value="${categoria.id}">
                ${categoria.nome}
            </option>
        `;
    });
}

let todosProdutos = [];
let todasCategorias = [];
let categoriaSelecionada = null;

async function carregarDados() {

    const respostaProdutos = await fetch(apiProdutos);
    todosProdutos = await respostaProdutos.json();

    const respostaCategorias = await fetch(apiCategorias);
    todasCategorias = await respostaCategorias.json();

    renderizarCategorias();
    buscarProdutos();
}

function renderizarCategorias() {

    const listaCategorias =
        document.getElementById("listaCategorias");

    listaCategorias.innerHTML = "";

    const botaoTodos = document.createElement("button");

    botaoTodos.innerText = "Todos";

    botaoTodos.onclick = () => {
        categoriaSelecionada = null;
        buscarProdutos();
    };

    listaCategorias.appendChild(botaoTodos);

    todasCategorias.forEach(categoria => {

        const botao = document.createElement("button");

        botao.innerText = categoria.nome;

        botao.onclick = () => {
            categoriaSelecionada = categoria.id;
            buscarProdutos();
        };

        listaCategorias.appendChild(botao);
    });
}

function buscarProdutos() {

    const textoPesquisa =
        document.getElementById("pesquisa")
        .value
        .toLowerCase();

    let produtosFiltrados = [...todosProdutos];

    if (categoriaSelecionada) {

        produtosFiltrados =
            produtosFiltrados.filter(
                p => p.categoriaId === categoriaSelecionada
            );
    }

    produtosFiltrados =
        produtosFiltrados.filter(
            p => p.nome.toLowerCase()
            .includes(textoPesquisa)
        );

    produtosFiltrados.sort(
        (a, b) => a.preco - b.preco
    );

    const lista =
        document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtosFiltrados.forEach(produto => {

        const categoria =
            todasCategorias.find(
                c => c.id === produto.categoriaId
            );

        lista.innerHTML += `
            <div class="card">

                <img
                    src="${produto.imagemUrl || 'Imagens/produto-sem-foto.jpg'}"
                    class="imagem-produto"
                >

                ${
                    produto.destaque
                    ? '<span class="badge">DESTAQUE</span>'
                    : ''
                }

                <h3>${produto.nome}</h3>

                <p>${produto.descricao || ''}</p>

                <p class="preco">
                    R$ ${produto.preco}
                </p>

                <p>
                    Categoria:
                    ${categoria ? categoria.nome : 'Sem categoria'}
                </p>

            </div>
        `;
    });
}

async function cadastrarProduto() {

    const produto = {

        nome:
            document.getElementById("nome").value,

        preco:
            parseFloat(
                document.getElementById("preco").value
            ),

        categoriaId:
            document.getElementById("categoriaId").value,

        descricao:
            document.getElementById("descricao").value,

        imagemUrl:
            document.getElementById("imagemUrl").value,

        destaque:
            document.getElementById("destaque").checked
    };

    await fetch(apiProdutos, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(produto)
    });

    await carregarDados();
    await carregarCategoriasSelect();
}

window.onload = async () => {
    await carregarCategoriasSelect();
    await carregarDados();
};