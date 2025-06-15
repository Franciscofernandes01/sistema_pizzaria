const express = require("express");
const app = express();
const connectToDatabase = require("./src/database/mongo");
const usuario = require("./src/routes/usuario");
const pizzas = require("./src/routes/pizzas");
const orders = require("./src/routes/ordem");
// conectando as rotas ao server
const routes = require("./src/routes/index");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger"); // Importe suas opções

// Corrigido: passar o objeto swaggerOptions, e não uma string
const specs = swaggerJsdoc(swaggerOptions);

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defina a rota do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rotas específicas antes da rota genérica
app.use("/usuario", usuario);
app.use("/pizza", pizzas);
app.use("/orders", orders);
app.use(routes);


app.listen(3000, "localhost", () => {
  console.log("servidor rodando na porta 3000!"); // mensagem de confirmação
  console.log("Documentação Swagger disponível em http://localhost:3000/api-docs");
});

