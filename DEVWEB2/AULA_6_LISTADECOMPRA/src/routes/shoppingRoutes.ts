import { Router } from "express";
import { createController, listController, updateController, deleteController } from "../controllers/shoppingController";

const router = Router();

router.get('/shopping', listController);
router.post('/shopping', createController);
router.put('/shopping/:id', updateController);
router.delete('/shopping/:id', deleteController);

export default router;
