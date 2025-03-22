const express = require('express');
const app = express();
//conectando as rotas ao server
const routes = require('./src/routes');
app.use(routes);

app.listen(3000,'localhost',()=>{
    console.log('servidor rodando na porta 3000!')//mensagem de confirmação
});