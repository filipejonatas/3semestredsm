import { Router, Request, Response } from 'express';
import { createItem, getItems, updateItem, deleteItem, getTotalExpenses } from '../controllers/shoppingController'

const router = Router();

router.post('/item', async (req: Request, res: Response) => {
    await createItem(req, res);
});

router.get('/items', async (req: Request, res: Response) => {
    await getItems(req, res);
});

router.put('/item/:id', async (req: Request, res: Response) => {
    await updateItem(req, res);
});

router.delete('/item/:id', async (req: Request, res: Response) => {
    await deleteItem(req, res);
});

router.get('/total', getTotalExpenses);

export default router;
