import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import connect from "./models/connection"
import PatenteModel from "./models/PatenteModel";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);


var patentes: Array<PatenteModel> = [];
var patente = new PatenteModel("Marechal do Ar", 1);
patentes.push(patente);
patente = new PatenteModel("Brigadeiro", 2);
patentes.push(patente);
patente = new PatenteModel("Coronel", 3);
patentes.push(patente);
var patente = new PatenteModel("Major", 4);
patentes.push(patente);
var patente = new PatenteModel("Capitão", 5);
patentes.push(patente);


let index = 0;
patentes.forEach((patente) => {
    (async () => {
        try {
            const response = await fetch('http://localhost:3001/patente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigo: patente.codigo,
                    descricao: patente.descricao,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                patentes[index].id = data.id; // Atualiza o ID retornado pelo backend
                console.log(`Patente ${patente.descricao} salva com ID: ${data.id}`);
            } else {
                console.error(`Erro ao salvar ${patente.descricao}:`, data);
            }
            index++;
        } catch (error) {
            console.error(`Erro na requisição para salvar ${patente.descricao}:`, error);
        }
    })();
});