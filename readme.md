# API de Catálogo de Produtos

Este é um projeto desenvolvido para treinar habilidades com Node.js, utilizando o Express.js como framework de desenvolvimento e Sequelize como ORM para gerenciar o banco de dados.

## Agradecimentos Especiais

Primeiramente, quero agradecer a todos que acreditaram no meu progresso até este momento. Sem eles, não seria capaz de progredir 1% do que progredi aqui. Um salve especial para Henrique Santos, que me ensinou o básico necessário para criar a base da API, incluindo a criação de filtros e a estruturação de JSON de forma simples usando o body-parser, além de orientar na criação das rotas.

## Como Usar o Projeto?

Este projeto não possui uma interface gráfica. Para instalar e executar, siga os passos abaixo:

## Clonar o Repositório

git clone https://github.com/thadeu220v/api-catalogo-de-produtos

### Instalar Dependências
Certifique-se de ter o Node.js e o npm instalados em seu ambiente. Em seguida, instale as dependências do projeto:
npm install

## gerenciamento do arquivo de variáveis de ambiente
Este sistema exige autenticação por meio de um arquivo de valores de ambiente, isso significa que o usuário e senha são definidos dentro de /src/.env
dentro do repositório, já temos um arquivo preenchido. basta substituir com os valores de ADMINUSERNAME e ADMINPASSWORD. com os valores de usuário e senha que deseja utilizar.

## criando o usuário administrador
como parte do processo de instalação é importante antes de executar o servidor, criar o usuário e senha de banco de dados que serão usados para gerar o token de acesso, e por fim,  com o token, manipular o serviço.
após informar o usuário e senha no arquivo .env fornecido, você deve executar no seu ambiente o seguinte arquivo com o comando:
node ./src/scripts/createUser.js

este comando criará o usuário e senha no banco de dados.

### Executar o Servidor
Após instalar todas as dependências, criar o arquivo .env e o usuário administrador, navegue até a pasta do projeto e execute o servidor:
node ./src/index.js
Isso inicializará o servidor na porta 3000 do seu localhost.
Este sistema já inclui banco de dados em sqlite.

## autenticação usando o JWT
A API utiliza JWT (JSON Web Token) para proteger as rotas de manipulação de produtos e categorias. O processo de autenticação funciona da seguinte forma:
### Gerar Token JWT:
Acesse a rota /login e forneça o nome de usuário e senha no corpo da requisição.
Usuário e Senha informados no seu .env que foram criados no banco:

Essa configuração é temporária e não recomendada para produção. No futuro, será implementado um sistema mais seguro de validação com banco de dados.

## Um pequeno exemplo usando curl
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{
    "username": "user",
    "password": "pass"
}'

## um pequeno exemplo pelo json
{
    "username":"nome de usuário",
    "password":"informeasenhaaqui"
}


## login com o token gerado
Após obter seu token gerado, você deverá inserí-lo no corpo da sua requisição, seja ela POST, GET, PUT, PATCH ou DELETE pelo seguinte formato.
Authorization: Bearer <seu_token_jwt>



# Rotas da API
## Produtos
GET /products: Obtém todos os produtos adicionados no banco de dados.
POST /products: Permite adicionar novos produtos. O formato do JSON deve ser o seguinte:
{
    "name": "Nome do produto",
    "description": "Descrição do produto",
    "price": 44.00,
    "stock": 10,
    "categories": [1, 2, 3]
}
GET /products/:id: Consulta um produto específico pelo ID.
PUT /products/:id: Edita um produto existente. Exemplo de corpo de requisição:
{
    "name": "Novo título de produto",
    "description": "Nova descrição",
    "price": 400.00,
    "stock": 20,
    "categories": [1]
}
PATCH /products/:id: Atualiza parcialmente um produto. Exemplo de corpo de requisição:
{
    "name": "Apenas mudarei o nome do produto"
}
DELETE /products/:id: Deleta um produto pelo ID.
Categorias
GET /categories: Obtém todas as categorias adicionadas no banco de dados.
POST /categories: Permite adicionar novas categorias. O formato do JSON deve ser o seguinte:
{
    "name": "Nome da categoria"
}
GET /categories/:id: Consulta uma categoria específica pelo ID.
PUT /categories/:id: Edita uma categoria existente. Exemplo de corpo de requisição:
{
    "name": "Novo nome da categoria"
}
• DELETE /categories/:id: Deleta uma categoria pelo ID.

### Comandos de Teste
Testar Rotas de Produtos usando curl
Obter todos os produtos:
curl -X GET http://localhost:3000/products
Adicionar um novo produto:
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{
    "name": "Produto Teste",
    "description": "Descrição do produto teste",
    "price": 99.99,
    "stock": 50,
    "categories": [1, 2]
}'
Consultar um produto específico:
curl -X GET http://localhost:3000/products/1
Editar um produto:
curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{
    "name": "Produto Atualizado",
    "description": "Descrição atualizada",
    "price": 199.99,
    "stock": 30,
    "categories": [1]
}'
Atualizar parcialmente um produto:
curl -X PATCH http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{
    "name": "Nome Parcialmente Atualizado"
}'
 Deletar um produto:
curl -X DELETE http://localhost:3000/products/1
Testar Rotas de Categorias
 Obter todas as categorias:
curl -X GET http://localhost:3000/categories
 Adicionar uma nova categoria:
curl -X POST http://localhost:3000/categories -H "Content-Type: application/json" -d '{
    "name": "Categoria Teste"
}'
 Consultar uma categoria específica:
curl -X GET http://localhost:3000/categories/1
 Editar uma categoria:
curl -X PUT http://localhost:3000/categories/1 -H "Content-Type: application/json" -d '{
    "name": "Categoria Atualizada"
}'
 Deletar uma categoria:
curl -X DELETE http://localhost:3000/categories/1

## Contribuições
Tem ideias? Abra um pull request ou uma issue! Terei o prazer em responder no menor tempo possível.
## Contato
Thadeu Henrique dos Anjos
E-mail: thadeuhenriquedosanjos@gmail.com