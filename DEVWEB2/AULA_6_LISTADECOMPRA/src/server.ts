import express from 'express'
import path from 'path';
import mongoose from 'mongoose';
import shoppingRoutes from './routes/shoppingRoutes'
import cors from 'cors'

const app = express();
app.use(cors());
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/shoppingitens';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Mongo DB Conectado'))
    .catch(err => console.log('Erro ao conectar o banco', err));

app.use(express.static(path.join(__dirname, 'views')));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas
app.use('/api', shoppingRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
});



