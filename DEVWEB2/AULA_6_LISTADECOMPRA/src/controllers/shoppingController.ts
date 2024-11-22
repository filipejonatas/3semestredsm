import Shopping from "../models/shoppingItem";
import { RequestHandler } from "express";

export const createController: RequestHandler = async (req, res) => {
    const { produto, preco } = req.body;
    try {
        const document = new Shopping({ produto, preco });
        const resp = await document.save();
        res.json(resp); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const listController: RequestHandler = async (req, res) => {
    try {
        const resp = await Shopping.find();
        res.json(resp); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateController: RequestHandler = async (req, res) => {
    const { produto, preco } = req.body;
    try {
        const document = await Shopping.findOne({ produto });
        if (!document) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        document.set({ preco });
        const updated = await document.save();
        res.json(updated); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteController: RequestHandler = async (req, res) => {
    const { produto } = req.body;
    try {
        const deletedDocument = await Shopping.findOneAndDelete({ produto });
        if (!deletedDocument) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso' }); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
