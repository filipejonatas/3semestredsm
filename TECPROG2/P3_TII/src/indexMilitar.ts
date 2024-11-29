import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import connect from "./models/connection"
import MilitarModel from "./models/MilitarModel";

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

var militares: Array<MilitarModel> = [];
var militar = new MilitarModel("Marcos da Silva", 21, "marcos.silva@fab.mil.br", "12912343567");
militares.push(militar);
militar = new MilitarModel("Ana Maria Brega", 25, "ana.brega@fab.mil.br", "12999979999");
militares.push(militar);
militar = new MilitarModel("Paulo França", 18, "paulo.fraca@fab.mil.br", "12999967999");
militares.push(militar);
militar = new MilitarModel("Edson Arantes", 30, "edson.arantes@gmail.sp.gov.br", "12999957999");
militares.push(militar);

let index = 0;
militares.forEach((militar) => {
    (async () => {
        try {
            const response = await fetch('http://localhost:3001/militar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: militar.nome,
                    idade: militar.idade,
                    email: militar.email,
                    fone: militar.fone,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                militares[index].id = data.id; // Atualiza o ID retornado pelo backend
                console.log(`Militar ${militar.nome} salvo com ID: ${data.id}`);
            } else {
                console.error(`Erro ao salvar ${militar.nome}:`, data);
            }
            index++;
        } catch (error) {
            console.error(`Erro na requisição para salvar ${militar.nome}:`, error);
        }
    })();
});