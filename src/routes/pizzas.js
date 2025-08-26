const express = require("express");
const Pizzas = require("../models/pizzas");
const router = express.Router();
const { autenticarJWT } = require("../middleware/auth");

/**
 * @swagger
 * /pizzas:
 *   get:
 *     summary: Lista todas as pizzas
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pizzas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pizza'
 *       500:
 *         description: Erro ao listar as pizzas
 */
router.get("/pizzas",autenticarJWT, async (_, res) => {
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

/**
 * @swagger
 * /pizzas/{id}:
 *   get:
 *     summary: Retorna uma pizza pelo ID
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da pizza
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pizza encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pizza'
 *       404:
 *         description: Pizza não encontrada
 *       500:
 *         description: Erro ao buscar a pizza
 */
router.get("/:id",autenticarJWT, async (req, res) => {
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

/**
 * @swagger
 * /pizzas:
 *   post:
 *     summary: Cria uma nova pizza
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Quatro Queijos
 *               preco:
 *                 type: number
 *                 example: 42.5
 *     responses:
 *       201:
 *         description: Pizza criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pizza'
 *       400:
 *         description: Erro ao criar a pizza
 */
router.post("/pizzas",autenticarJWT, async (req, res) => {
  try {
    const { nome, preco } = req.body;

    const newPizza = new Pizzas({ nome, preco });

    await newPizza.save();

    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar o pizza" });
  }
});

/**
 * @swagger
 * /pizzas/{id}:
 *   put:
 *     summary: Atualiza uma pizza existente
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da pizza
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
 *                 example: Calabresa
 *               preco:
 *                 type: number
 *                 example: 39.99
 *     responses:
 *       200:
 *         description: Pizza atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pizza'
 *       400:
 *         description: Erro ao atualizar a pizza
 *       404:
 *         description: Pizza não encontrada
 */
router.put("/:id",autenticarJWT, async (req, res) => {
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

/**
 * @swagger
 * /pizzas/{id}:
 *   delete:
 *     summary: Remove uma pizza
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da pizza
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pizza deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pizza deletado com sucesso
 *       404:
 *         description: Pizza não encontrada
 *       500:
 *         description: Erro ao deletar a pizza
 */
router.delete("/:id",autenticarJWT, async (req, res) => {
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
