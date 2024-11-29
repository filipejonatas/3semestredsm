import { Router } from "express";
import controller from "../controllers/SoldadoController"

const router = Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;
