# 🍫 Cacau Dourado API

Projeto desenvolvido para a disciplina de **Arquitetura de Aplicações Web — 2026.1**.

O sistema consiste em um catálogo de produtos da Cacau Dourado, permitindo o gerenciamento de produtos e categorias através de uma API REST integrada a um banco de dados MongoDB, além de uma interface web com consumo assíncrono da API.

---

# 📚 Objetivo do Projeto

Desenvolver uma aplicação web completa utilizando:

- API REST
- Banco de dados NoSQL
- Documentação Swagger/OpenAPI
- Frontend com JavaScript assíncrono (`fetch`)
- Integração entre frontend e backend

---

# 🚀 Tecnologias Utilizadas

## Backend
- .NET 10 (C#)
- ASP.NET Core Web API

## Banco de Dados
- MongoDB

## Frontend
- HTML5
- CSS3
- JavaScript

## Documentação
- Swagger / OpenAPI

---

# 📦 Funcionalidades

## Categorias
- ✅ Cadastrar categoria
- ✅ Listar categorias
- ✅ Buscar categoria por ID
- ✅ Atualizar categoria
- ✅ Excluir categoria

## Produtos
- ✅ Cadastrar produto
- ✅ Listar produtos
- ✅ Buscar produto por ID
- ✅ Atualizar produto
- ✅ Excluir produto

## Frontend
- ✅ Listagem assíncrona de produtos
- ✅ Cadastro sem recarregar página
- ✅ Integração com API via fetch
- ✅ Exibição do nome da categoria
- ✅ Layout personalizado preto e dourado

---

# 🧩 Estrutura do Projeto

```text
CacauDourado.Api
│
├── Controllers
├── Models
├── Services
├── Configurations
├── Frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── Program.cs
```

---

# ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- .NET SDK 10
- MongoDB
- Visual Studio Code ou Visual Studio
- Git

---

# 🔧 Configuração do Banco de Dados

No arquivo `appsettings.json`, configure a conexão com o MongoDB:

```json
"MongoDbSettings": {
  "ConnectionString": "mongodb://localhost:27017",
  "DatabaseName": "CacauDouradoDb"
}
```

> Os valores acima são apenas exemplos.

---

# ▶️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/cacau-dourado-api.git
```

---

## 2. Acessar a pasta do projeto

```bash
cd CacauDourado.Api
```

---

## 3. Restaurar dependências

```bash
dotnet restore
```

---

## 4. Executar a API

```bash
dotnet run
```

---

# 📄 Swagger

A documentação Swagger ficará disponível em:

```text
http://localhost:5092/swagger
```

---

# 🌐 Frontend

Para executar o frontend corretamente, recomenda-se utilizar a extensão:

- Live Server (VSCode)

Depois:
- Clique com o botão direito no `index.html`
- Selecione **Open with Live Server**

---

# 🔄 Comunicação Assíncrona

O frontend utiliza:

```javascript
fetch()
```

para realizar chamadas assíncronas à API sem recarregar a página.

---

# 👩‍💻 Autora

**Giulia Oliveira**

Projeto acadêmico desenvolvido para a disciplina de Arquitetura de Aplicações Web.

---

# 📌 Observações

- O projeto utiliza MongoDB como banco NoSQL.
- Todas as rotas da API seguem o padrão REST.
- O Swagger foi utilizado para documentação e testes dos endpoints.
- O frontend consome a API de forma assíncrona utilizando JavaScript puro.
