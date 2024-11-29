import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import connect from "./models/connection"
import SoldadoModel from "./models/SoldadoModel";

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


var soldados: Array<SoldadoModel> = [];
var soldado = new SoldadoModel(1234567891, 1.73, "Marcos da Silva");
soldados.push(soldado);
soldado = new SoldadoModel(1212121212, 1.69, "Ana Maria Brega");
soldados.push(soldado);
soldado = new SoldadoModel(2121212121, 1.8, "Paulo França");
soldados.push(soldado);

let index = 0;
soldados.forEach((soldado) => {
    (async () => {
        try {
            const response = await fetch('http://localhost:3001/soldado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cim: soldado.cim,
                    altura: soldado.altura,
                    militar: soldado.militar,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                soldados[index].id = data.id; // Atualiza o ID retornado pelo backend
                console.log(`Soldado ${soldado.militar} salvo com ID: ${data.id}`);
            } else {
                console.error(`Erro ao salvar ${soldado.militar}:`, data);
            }
            index++;
        } catch (error) {
            console.error(`Erro na requisição para salvar ${soldado.militar}:`, error);
        }
    })();
});