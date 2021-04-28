const express = require('express');
const app = express();
app.use(express.json());

const axios = require("axios");

let id = 0;
let clientes = [];

app.get('/clientes', (req, res) => {
    res.send(clientes)
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const cliente = clientes.find(e => {
        return e.id == id;
    });

    res.send(cliente);
});

app.post('/clientes', async (req, res) => {
    id++;
    const { nome, endereco, idade } = req.body;

    clientes.push({
        id,
        nome,
        endereco,
        idade
    });

    cliente = clientes.find(e => {
        return e.id == id;
    });

    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            id,
            nome,
            endereco,
            idade
        }
    });

    res.status(201).send(cliente);
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, idade } = req.body;

    const index = clientes.findIndex(e => {
        return e.id === Number(id);
    });

    clientes[index] = {
        id: Number(id),
        nome,
        endereco,
        idade
    }

    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            id,
            nome,
            endereco,
            idade
        }
    });

    res.json(clientes[index])
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;

    const index = clientes.findIndex(e => {
        return e.id === Number(id);
    });

    clientes.splice(index, 1);

    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteDeletado",
        dados: {
            id
        }
    });

    res.json("Delete Success");
});

app.listen(4000, () => {
    console.log('Clientes. Porta 4000')
});