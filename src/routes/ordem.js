const express = require("express");
const Order = require("../models/ordens");
const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(200).json({ error: "Nenhum pedido encontrado" });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar os pedidos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrada" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar o pedido" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { cliente_id, items } = req.body;

    const newOrder = new Order({ cliente_id, items });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "Erro ao criar o pedido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { value, isPaid, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { value, isPaid, status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar o Pedido" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json({ message: "Order deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o pedido" });
  }
});

module.exports = ordem = router;