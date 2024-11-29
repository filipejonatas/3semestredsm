import mongoose from "mongoose";
import { Schema } from "mongoose";

const dddsBrasil: number[] = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99,
];

const MilitarSchema = new Schema({
    nome: {
        type: String,
        maxlength: [50, "Máximo de 50 caracteres"],
        required: true,
    },
    idade: {
        type: Number,
        min: [18, "A idade mínima permitida é 18 anos"],
        max: [120, "A idade máxima permitida é 120 anos"],
        validate: {
            validator: function (value: number): boolean {
                return typeof value === "number" && value >= 18 && value <= 120;
            },
            message: (props: { value: number }) =>
                `${props.value} é um valor inválido`,
        },
    },
    email: {
        type: String,
        maxlength: [100, "O e-mail pode ter no máximo 100 caracteres"],
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string): boolean {
                // Regex para formato geral do e-mail
                const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(value)) {
                    return false;
                }
                const dominiosMilitares: string[] = [
                    "eb.mil.br",
                    "fab.mil.br",
                    "marinha.mil.br",
                ];
                const dominio: string = value.split("@")[1];
                return dominiosMilitares.includes(dominio);
            },
            message: (props: { value: string }) =>
                `${props.value} não é um e-mail válido para militares das Forças Armadas`,
        },
    },
    fone: {
        type: String,
        maxlength: [11, "O número de telefone pode ter no máximo 11 dígitos"],
        required: true,
        validate: {
            validator: function (value: string): boolean {
                // Regex para validar formato do número
                const regex: RegExp = /^[0-9]{10,11}$/;
                if (!regex.test(value)) {
                    return false;
                }
                const ddd: number = parseInt(value.substring(0, 2), 10);
                return dddsBrasil.includes(ddd);
            },
            message: (props: { value: string }) =>
                `${props.value} não é um número de telefone válido`,
        },
    },
});

const SoldadoSchema = new Schema({
    cim: {
        type: Number,
        max: 10,
        unique: true,
        required: true,
    },
    altura: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: number): boolean {
                return typeof value === "number" && value >= 1.62;
            },
            message: (props: { value: number }) =>
                `${props.value} é um valor inválido. Altura mínima permitida é 1.62m.`,
        },
    },
    militar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Militar",
        required: true,
        unique: true,
        validate: {
            validator: async function (id: string): Promise<boolean> {
                const militar = await Militar.findById(id);
                return !!militar;
            },
            message: "Militar inexistente. O ID fornecido não corresponde a um Militar cadastrado.",
        },
    },
});

const PatenteSchema = new Schema({
    codigo: {
        type: Number,
        validate: {
            validator: function (value: number): boolean {
                return value > 0 && value <= 20;
            },
            message: (props: { value: number }) =>
                `${props.value} é um valor inválido`,
        },
    },
    descricao: {
        type: String,
        maxlength: 30,
        required: true,
    },
});

// Declaração dos modelos
const Militar = mongoose.model("Militar", MilitarSchema);
const Soldado = mongoose.model("Soldado", SoldadoSchema);
const Patente = mongoose.model("Patente", PatenteSchema);

export { Militar, Soldado, Patente };
