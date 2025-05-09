const express = require('express');
const app = express();
const connectToDatabase = require('./src/database/mongo');
const usuario = require('./src/routes/usuario');
const pizzas = require('./src/routes/pizzas');
const orders = require('./src/routes/ordem');
//conectando as rotas ao server
const routes = require('./src/routes/index');
connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);
app.use("/", usuario);
app.use("/pizza", pizzas);
app.use("/orders", orders);

app.listen(3000,'localhost',()=>{
    console.log('servidor rodando na porta 3000!')//mensagem de confirmação
});