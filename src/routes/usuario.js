const express = require("express");
const Cliente = require("../models/clientes"); // Importa o modelo Client
const router = express.Router();

// Listar todos os clientes
router.get("/", async (_, res) => {
  try {
    const clientes = await Cliente.find();

    if (!clientes || clientes.length === 0) {
      return res.status(200).json({ error: "Nenhum cliente foi encontrado" });
    }

    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar os seus clientes" });
  }
});

// Mostrar um cliente específico
router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não foi encontrado" });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar o seu cliente" });
  }
});

// Criar um novo cliente
router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    const newCliente = new Cliente({ nome, telefone });

    await newCliente.save();

    res.status(201).json(newCliente);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "Erro ao criar o cliente" });
  }
});

// Atualizar um cliente existente
router.put("/:id", async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const updatedCliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { nome, telefone },
      { new: true, runValidators: true }
    );

    if (!updatedCliente) {
      return res.status(404).json({ error: "Cliente não foi encontrado" });
    }

    res.json(updatedCliente);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar o cliente" });
  }
});

// Deletar um cliente
router.delete("/:id", async (req, res) => {
  try {
    const deletedCliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!deletedCliente) {
      return res.status(404).json({ error: "Cliente não foi encontrado" });
    }
    res.json({ message: "Cliente deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o cliente" });
  }
});

module.exports = usuario = router;
