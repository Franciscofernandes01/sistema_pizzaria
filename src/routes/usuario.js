const express = require("express");
const Cliente = require("../models/clientes"); // Importa o modelo Client
const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro ao listar os clientes
 */
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

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao buscar o cliente
 */
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

/**
 * @swagger
 * /clientes/cadastrar:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro ao criar o cliente
 */
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

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do cliente
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Oliveira
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro ao atualizar o cliente
 *       404:
 *         description: Cliente não encontrado
 */
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

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente deletado com sucesso!
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao deletar o cliente
 */
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
