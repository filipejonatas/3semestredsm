import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import connect from './src/models/connect';

dotenv.config();

//Definido variavel de ambiente
const PORT = process.env.PORT || 3000;
const app = express();

//Suporta parametro no JSON da requisicao
app.use(express.json());
app.use(bodyParser.json());

//Conecta o MongoDB
connect();

app.listen(PORT, () =>{
    console.log(`Rodando na porta ${PORT}`);
});

app.use(routes);

