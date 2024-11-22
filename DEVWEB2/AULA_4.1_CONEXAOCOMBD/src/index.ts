import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Cliente from './models/cliente';

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/crud_clientes';

app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Mongo DB Conectado'))
    .catch(err => console.log('Erro ao conectar o banco', err));

app.listen(PORT, () => {
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
})

// Rotas

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o cliente' });
    }
});

app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body
    try {
        const novoCliente = new Cliente({ nome, email });
        await novoCliente.save();
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao buscar o cliente' })
    }
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        const clienteAtualizado = await Cliente.findByIdAndUpdate(id, { nome, email }, { new: true });
        res.json(clienteAtualizado);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o cliente' });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Cliente.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o cliente' });
    }
});




