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

        const card =
            document.createElement("div");

        card.className = "card";

        card.onclick = () => {
            card.classList.toggle("ativo");
        };

        card.innerHTML = `

            <img
                src="${produto.imagemUrl || 'imagens/produto-sem-foto.jpg'}"
                class="imagem-produto"
            >

            <h3>${produto.nome}</h3>

            <div class="detalhes-produto">

                <p>
                    <strong>Preço:</strong>
                    R$ ${produto.preco}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    ${categoria ? categoria.nome : 'Sem categoria'}
                </p>

                <p>
                    ${produto.descricao || ''}
                </p>

                ${
                    produto.destaque
                    ? '<span class="badge">⭐ Destaque</span>'
                    : ''
                }

            </div>
        `;

        lista.appendChild(card);
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

function toggleFormulario() {

    const formulario =
        document.getElementById(
            "formularioCadastro"
        );

    formulario.classList.toggle("aberto");
}

function mostrarCatalogo() {

    document.getElementById(
        "secaoCatalogo"
    ).style.display = "block";

    document.getElementById(
        "secaoCadastro"
    ).style.display = "none";
}

function mostrarCadastro() {

    document.getElementById(
        "secaoCatalogo"
    ).style.display = "none";

    document.getElementById(
        "secaoCadastro"
    ).style.display = "block";
}


window.onload = async () => {
    await carregarCategoriasSelect();
    await carregarDados();
    mostrarCatalogo();
};