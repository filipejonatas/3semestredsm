import mongoose from "mongoose";
const { Schema } = mongoose

const AutorSchema = new Schema({
    nome: { type: String, maxlength: [50, 'O nome pode ter no máx 50 caracteres'], required: true },
    cpf: {
        type: Number,
        maxlength: 11,
        minLength: 11,
        required: true,
        unique: true,
        validate: {
            validator: function
        }
    }
})
