const express = require('express');
const routes =  express.Router();

//cardapio (dados estáticos)
const cardapio = [{
    id: 1, nome:'Calabresa',tamanhos:'p, m, g', valores: '35.00, 40.00, 45.00'},
    {id: 2, nome:'Marguerita',tamanhos:'p, m, g', valores: '35.00, 40.00, 45.00'},
    {id: 3, nome:'Bacon',tamanhos:'p, m, g', valores: '25.00, 30.00, 35.00'},
    {id: 4, nome:'Brigadeiro',tamanhos:'p, m, g', valores: '35.00, 40.00, 45.00'}
];

//criando rota raiz
routes.get('/', (req, res)=>{
    response.send('servidor rodando na porta 3000')
});

//retorna itens cardapio
routes.get('/cardapio', (req,res)=>{
    res.json(cardapio)
});

//retorna item pelo id
routes.get('/cardapio/:id', (req, res) => {
    const id = parseInt(req.params.id); // Converte o parâmetro para número
    const pizza = cardapio.find(p => p.id === id); // Busca a pizza no array cardapio

    if (!pizza) {
        return res.status(404).json({ error: "Pizza não encontrada" });
    }

    res.json(pizza); // Retorna a pizza encontrada
});


//criando novo item
routes.post('/itens',(req,res)=>{
    res.json({message: "Item criado com sucesso"});
});

//atualiza item pelo id
routes.put('/cardapio/:id',(req,res)=>{
    res.json({message: `Pizza${req.params.id} atualizada`});
});

//deleta pizza
routes.delete('/cardapio/:id',(req,res)=>{
    res.json({message:`Pizza ${req.params.id} removida com sucesso!`});
});

module.exports = routes;