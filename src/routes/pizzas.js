const express = require("express");
const Pizzas = require("../models/pizzas");
const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const pizzas = await Pizzas.find();

    if (!pizzas || pizzas.length === 0) {
      return res.status(200).json({ error: "Nenhuma pizza encontrado" });
    }

    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar as pizzas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pizzas = await Pizzas.findById(req.params.id);
    if (!pizzas) {
      return res.status(404).json({ error: "Pizza não encontrada" });
    }
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar a pizza" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, preco } = req.body;

    const newPizza = new Pizzas({ name, price });

    await newPizza.save();

    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar o pizza" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nome, value } = req.body;
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      { nome, value },
      { new: true, runValidators: true }
    );

    if (!updatedPizza) {
      return res.status(404).json({ error: "Pizza não encontrado" });
    }

    res.json(updatedPizza);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar o Pizza" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPizza = await Pizzas.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ error: "Pizza não encontrado" });
    }
    res.json({ message: "Pizza deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o pizza" });
  }
});

module.exports = pizzas = router;
