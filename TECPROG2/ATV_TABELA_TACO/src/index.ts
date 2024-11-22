import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import fs from "fs";
import readline from "node:readline";
import Grupo from "./models/Grupo";
import Preparacao from "./models/Preparacao";
import Produto from "./models/Produto";
import query from "./controllers/db";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// inicializa o servidor na porta especificada
const server = app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

server.keepAliveTimeout = 61 * 1000;

// define a rota para o pacote /routes
app.use(routes);

// importando tabela grupo
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Grupo.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const g = new Grupo(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/grupo', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: g.id,
                gru_descricao: g.gru_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            });
    }
    x++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela preparacao
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Preparacao.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (y > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const p = new Preparacao(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/preparacao', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: p.id,
                pre_descricao: p.pre_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            });
    }
    y++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela produtos

const data = fs.readFileSync('./src/Taco-Produto.csv',
    { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV de Produtos, 
// colocando os dados na variável data linha a linha

let w: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

data.forEach(linha => { // faz a leitura de cada linha da variável data
    if (w > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l);
        const p = new Produto(parseInt(l[0]), l[1], parseInt(l[2])); // instancia um objeto do Modelo a ser usado
        const r: any = query( // cria a query direta, sem passar pelas rotas
            "INSERT INTO produto(id, pro_descricao, pro_grupo) VALUES ($1,$2,$3)",
            [p.id, p.pro_descricao, p.pro_grupo]
        );
    }
    w++; // incrementa a varíavel de controle de linha
}); // fecha data.forEach

console.log("Produtos importados...");