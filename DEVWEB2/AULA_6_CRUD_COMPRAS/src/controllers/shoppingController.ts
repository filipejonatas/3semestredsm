import { Request, Response } from 'express';
import ShoppingItem from '../models/shoppingItem';


export const createItem = async (req: Request, res: Response): Promise<Response> => {
  try {
      const { name, quantity } = req.body;
      const newItem = new ShoppingItem({ name, quantity });
      await newItem.save();
      return res.status(201).json(newItem);
  } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ message: errorMessage });
  }
};


export const getItems = async (req: Request, res: Response): Promise<Response> => {
  try {
      const items = await ShoppingItem.find();
      return res.json(items);
  } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ message: errorMessage });
  }
};


export const updateItem = async (req: Request, res: Response): Promise<Response> => {
  try {
      const { id } = req.params;
      const updatedItem = await ShoppingItem.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
      return res.json(updatedItem);
  } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ message: errorMessage });
  }
};


export const deleteItem = async (req: Request, res: Response): Promise<Response> => {
  try {
      const { id } = req.params;
      const deletedItem = await ShoppingItem.findByIdAndDelete(id);
      if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });
      return res.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({ message: errorMessage });
  }
};


