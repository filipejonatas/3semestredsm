import mongoose, { mongo, Schema } from "mongoose";

const ExpenseSchema: Schema = new Schema({
    totalAmount: { type: Number, required: true }
});

const Expense = mongoose.model('Expense',ExpenseSchema);
export default Expense;