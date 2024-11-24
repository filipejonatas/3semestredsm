import { Request, Response } from 'express';
import ShoppingItem from '../models/shoppingItem';
import Expense from '../models/totalExpense';

// Criar item
export const createItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, quantity, date } = req.body;
    const newItem = new ShoppingItem({ name, quantity, date: date || Date.now });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ message: errorMessage });
  }
};

// Listar todos os itens
export const getItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const items = await ShoppingItem.find();
    return res.json(items);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ message: errorMessage });
  }
};

// Atualizar item
export const updateItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, quantity, bought, date } = req.body; // Inclui a data no corpo da requisição
    const updatedItem = await ShoppingItem.findByIdAndUpdate(
      id, 
      { name, quantity, bought, date }, // Atualiza o campo de data se fornecido
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
    return res.json(updatedItem);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ message: errorMessage });
  }
};

// Deletar item
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

export const getTotalExpenses = async (req: Request, res: Response) => {
  try {
    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular as despesas' })
  }
};

