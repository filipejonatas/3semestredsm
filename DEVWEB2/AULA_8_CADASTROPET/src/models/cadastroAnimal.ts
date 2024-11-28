import mongoose, { Schema } from "mongoose";

const AnimalSchema = new Schema({
    nome: { type: String, required: true },
    especie: { type: String, required: true },
    idade: { type: Number, required: true },
    tutor: { type: String, required: true },
    contato: { type: String }
})

const cadastroAnimal = mongoose.model("Animal", AnimalSchema);

export default cadastroAnimal;