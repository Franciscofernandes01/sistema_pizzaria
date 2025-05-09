const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  preco: {
    type: Number,
    required: true,
  },
});

const Pizzas = mongoose.model("Pizzas", PizzaSchema);

module.exports = Pizzas;