const express =  require('express');
const bodyParser = require('body-parser');
const app = express();

// defini uma porta diferente para que vários projetos sejam executados em simultâneo no mesmo servidor
const port = 3001;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log ("A API de catálogo de produtos está sendo executada na porta "+ port + " do servidor");
});

app.get('/', (req, res) => {
console.log('você não deveria estar aqui ainda!');
});


