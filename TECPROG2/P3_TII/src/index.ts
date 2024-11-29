import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import connect from "./models/connection";
import MilitarModel from "./models/MilitarModel";
import { Soldado } from "./models/index";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

function phoneMask(v: string | undefined): string | undefined {
    if (v == undefined) {
        return undefined;
    }

    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length >= 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,5}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }

    return r;
}

app.post("/format-phone", (req, res) => {
    const { phone } = req.body;
    const formattedPhone = phoneMask(phone);
    return res.json({ formattedPhone });
});


// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);
