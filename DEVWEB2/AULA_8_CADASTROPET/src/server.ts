import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes/AnimaisRoutes';

const app = express();
const PORT = 3000;

// Conexão ao MongoDB
mongoose
  .connect('mongodb://localhost:27017/shopping-list')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Alterado de 'views' para 'public'

// Middleware para interpretar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rotas da API
app.use('/api', routes);

// Rota para a página inicial (renderizando o template EJS)
app.get('/', (req, res) => {
  res.render('index', { title: 'Cadastro de Animais' }); // Usando EJS
});

// Middleware global para tratamento de erros
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    error: 'Algo deu errado!',
    details: err.message,
  });
};

app.use(errorHandler);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
