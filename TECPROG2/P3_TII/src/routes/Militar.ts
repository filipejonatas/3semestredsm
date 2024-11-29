import { Router } from "express";
import controller from '../controllers/MilitarController'

const routes = Router();

routes.post("/", controller.create);
routes.get("/", controller.list);
routes.put("/", controller.update);
routes.delete("/", controller.delete);

export default routes;
