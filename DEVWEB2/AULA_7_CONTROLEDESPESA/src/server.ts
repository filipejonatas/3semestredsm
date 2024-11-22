import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import shoppingRoutes from './routes/shoppingRoutes'

const app = express();
const PORT = 3000;

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/shopping-list')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rotas
app.use('/api', shoppingRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
