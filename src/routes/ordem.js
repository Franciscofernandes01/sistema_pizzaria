const express = require("express");
const Order = require("../models/ordens");
const router = express.Router();
const { autenticarJWT } = require("../middleware/auth");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos ou mensagem de que não há pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro ao listar os pedidos
 */
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

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao buscar o pedido
 */
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

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente_id
 *               - items
 *             properties:
 *               cliente_id:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto_id:
 *                       type: string
 *                     quantidade:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Erro ao criar o pedido
 */
router.post("/",autenticarJWT, async (req, res) => {
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

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               isPaid:
 *                 type: boolean
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       400:
 *         description: Erro ao atualizar o pedido
 */
router.put("/:id",autenticarJWT, async (req, res) => {
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

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Deleta um pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao deletar o pedido
 */
router.delete("/:id",autenticarJWT, async (req, res) => {
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