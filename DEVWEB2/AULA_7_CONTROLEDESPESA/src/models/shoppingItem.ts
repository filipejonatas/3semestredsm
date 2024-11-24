import mongoose, { Schema, Document } from 'mongoose';

// Interface para os itens de compra
export interface IShoppingItem extends Document {
    name: string;
    quantity: number;
    bought: boolean;
    date: Date;
}

// Esquema do MongoDB
const shoppingItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    bought: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

// Exportar modelo
const ShoppingItem = mongoose.model<IShoppingItem>('ShoppingItem', shoppingItemSchema);
export default ShoppingItem;
