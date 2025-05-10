# Sistema de Pizzaria

Este projeto implementa um back-end para gerenciamento de uma pizzaria utilizando Node.js, Express e MongoDB. Inclui operações CRUD para pizzas, clientes, ordens e usuários.

---

## Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **MongoDB** com **Mongoose**

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd sistema_pizzaria-main
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node index.js
   ```

4. Certifique-se de que o MongoDB está em execução localmente:

   ```bash
   mongod
   ```

---

## Conexão com o Banco de Dados

A conexão é feita em `src/database/mongo.js` usando Mongoose:

```js
mongoose.connect('mongodb://localhost:27017/sistema_pizzaria', {...});
```

Ao iniciar o sistema, o banco e coleções são criados automaticamente ao inserir os primeiros dados.

---

## CRUD de Pizzas

### Criar Pizza

* **POST** `/pizzas`
* **Body JSON:**

```json
{
  "nome": "Calabresa",
  "ingredientes": "Calabresa, cebola, mussarela",
  "preco": 39.90
}
```

### Listar Pizzas

* **GET** `/pizzas`
* **Resposta:** Array de objetos pizza

### Atualizar Pizza

* **PUT** `/pizzas/:id`
* **Body JSON:**

```json
{
  "nome": "Calabresa Especial",
  "ingredientes": "Calabresa, cebola, mussarela, catupiry",
  "preco": 44.90
}
```

### Deletar Pizza

* **DELETE** `/pizzas/:id`

---

## Estrutura do Projeto

```
src/
├── database/
│   └── mongo.js
├── models/
│   ├── clientes.js
│   ├── ordens.js
│   └── pizzas.js
├── routes/
│   ├── index.js
│   ├── ordem.js
│   ├── pizzas.js
│   └── usuario.js
index.js
```

---

## Testes de API

Use o Postman ou Insomnia para testar as rotas, enviando requisições para `http://localhost:3000/pizzas` com os dados em formato JSON.

---
## Autor: 
Francisco Fernandes