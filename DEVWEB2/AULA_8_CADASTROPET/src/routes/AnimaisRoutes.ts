import { Router } from 'express';
import controller from '../controllers/AnimalController'

const routes = Router();

// Rota para criar um novo animal
routes.post('/animais', controller.create);

// Rota para buscar todos os animais
routes.get('/animais', controller.getAll);

// Rota para buscar um animal específico pelo ID
routes.get('/animais/:id', controller.getById);

// Rota para atualizar um animal pelo ID
routes.put('/animais/:id', controller.update);

// Rota para deletar um animal pelo ID
routes.delete('/animais/:id', controller.delete);

export default routes;
