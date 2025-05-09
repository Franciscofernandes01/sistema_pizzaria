const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizzas",
      required: true,
      minQuantity: 1,
    },
  ],
  value: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pendente", "Preparando", "Entregue"],
    default: "Pendente",
  },
});

const ordens = mongoose.model("Orders", OrdersSchema);

module.exports = ordens;