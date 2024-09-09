import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    mail: { type: String, maxLength: 50, required: true },
    password: { type: String, minlength: 6, maxlength: 10, select: false, required: true }
});

const SpentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, maxlength: 30, required: true },
    value: { type: Number, required: true }
});

const User = mongoose.model("User", UserSchema);
const Spent = mongoose.model("Spent", SpentSchema);

export { User, Spent };