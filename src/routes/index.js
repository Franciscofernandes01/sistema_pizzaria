const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Bem vindo a pizzaria" });
});


module.exports = router;
