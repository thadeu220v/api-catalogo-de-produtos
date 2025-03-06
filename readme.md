# API de catálogo de produtos
Este é um projeto feito para treinar habilidades com o nodeJS, usando o expressJS como framework de desenvolvimento.

## agradecimentos especiais
Primeiramente, quero agradecer a todos os que acreditaram em meu progresso até este momento, sem eles, não seria capaz de progredir 1% do que progredi aqui.
um salve vai para henrique Santos, que me iniciou com o básico que precisava para criar a base da API. ele me ensinou a fazer os filtros e estruturar o json de forma simples usando o bodyParser, criando o json de um jeito mais rápido.
Também com sua paciência na hora de orientar a criar os caminhos de rotas.

## como usar o projeto?
Este projeto não conta com um ambiente gráfico. para instalar execute em seu ambiente:
git clone https://github.com/thadeu220v/api-catalogo-de-produtos

após, com o node e o npm instalados em seu ambiente, obtenha as dependências do projeto que estão no package.json
rode:
npm install

após todas as dependências ativas na pasta do seu projeto., usando o terminal / prompt de comandos ou powershell, caminhe para a pasta aonde o projeto está clonado e  execute:
node ./src/index.js

isso inicializará o servidor na porta 3000 do seu localhost

## novidade: banco de dados SQLite
Agora, nas próximas versões, contaremos com um banco de dados feito em SQLite, que nos auxiliará a manter os dados dos produtos de forma permanente. É claro que, você poderá ainda contar com as funções de adição, alteração, leitura e apagamento de informações do banco de dados. 

## rotas
get /products == obtem todos os produtos adicionados no banco de dados
post /products == permite adicionar novos produtos, o formato do json deve ser o seguinte:

{
    "title":"Nome do produto",
    "description":"Descrição do produto",
    "preco":44.00, ## o valor deverá ser um float
"categoria": 1 ## deverá informar o ID da categoria, pode ser mais de uma categoria
}

### para consultar um produto específico registrado no json
Envie uma solicitação get para:
get http://localhost:3000/products/códigodoproduto
Por exemplo:
get http://localhost:3000/products/1
Será retornado um json com os dados do produto solicitado. Se o produto não existir, será retornado um erro 404 com os detalhes da solicitação e sua negativa.

### para editar um produto
Envie uma solicitação put com o seguinte template de json para:
put http://localhost:3000/products/numerodoproduto
Por exemplo:
put http://localhost:3000/products/1

E o seguinte corpo de requisição:
{
    "title":"novo titulo de produto",
    "description":"nova descrição",
    "preco":400.00, 
"categoria": 1  
}


Será retornado um json com o produto cadastrado já modificado. Se ela não existir, será retornado um erro 404 com os detalhes da solicitação e sua negativa.
Você pode conferir se a atualização ocorreu usando o seguinte comando http
get http://localhost:3000/products
assim será exibido todos os produtos, e com isso, será possível conferir todos os demais objetos do json.

## atualizar apenas alguns campos do produto
usando o http patch, é possível corrigir apenas alguns dos campos, não sendo necessário informar os demais campos de forma desnecessária, isso é útil para quando queremos por exemplo, modificar apenas algumas pequenas informações do sistema.
Segue abaixo o exemplo de uma solicitação patch na API que atualiza o produto com ID = 1 apenas com o campo título:

patch http://localhost:3000/products/1
{
    "title":"apenas mudarei o nome do produto"
}

Ao enviar a solicitação, apenas o campo de titulo do produto será alterado.
## tem ideias? abra um pull request ou uma issue!
Eu terei o prazer em responder no menor tempo.
Contato: thadeu henrique dos anjos
e-mail: thadeuhenriquedosanjos@gmail.com
