const express = require("express");
const Cliente = require("../models/clientes");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (_, res) => {
  res.json({ message: "Bem vindo a pizzaria" });
});


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do cliente
 *     tags: [Autenticação]
 *     description: Gera um token JWT se o número de telefone for válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telefone
 *             properties:
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "666ab123cdef7890"
 *                     telefone:
 *                       type: string
 *                       example: "11999999999"
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciais inválidas."
 */
router.post("/login", async (req, res) => {
  const { telefone } = req.body;
  const user = await Cliente.findOne({ telefone });

  if (user) {
    const token = jwt.sign({ telefone }, "segredoJWT", { expiresIn: "1h" });
    return res.json({
      token,
      user: { id: user.id, telefone: user.telefone },
      message: "Login realizado com sucesso!",
    });
  }
  res.status(401).json({ message: "Credenciais inválidas." });
});


module.exports = router;


