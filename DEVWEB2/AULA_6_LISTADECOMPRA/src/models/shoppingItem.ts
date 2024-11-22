import mongoose from "mongoose";

const ShoppingSchema = new mongoose.Schema({
    produto: { type: String, required: true },
    preco: { type: Number, required: true, unique: true }
});

const Shopping = mongoose.model('Shopping', ShoppingSchema);
export default Shopping;
