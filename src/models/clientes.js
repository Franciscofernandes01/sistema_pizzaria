const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);

module.exports = Cliente;