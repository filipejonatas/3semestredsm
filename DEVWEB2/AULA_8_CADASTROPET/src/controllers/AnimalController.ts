import { Request, Response } from 'express';
import cadastroAnimal from '../models/cadastroAnimal';
import asyncHandler from '../middleware/asyncHandler'

class AnimalController {
    public create = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const { nome, especie, idade, tutor, contato } = req.body;

        if (!nome || !especie || !idade || !tutor) {
            return res.status(400).json({ error: 'Nome, espécie, idade e tutor são obrigatórios.' });
        }

        const document = new cadastroAnimal({ nome, especie, idade, tutor, contato });
        const resp = await document.save();
        return res.status(201).json(resp);
    });

    public getAll = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const animals = await cadastroAnimal.find();
        return res.status(200).json(animals);
    });

    public getById = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const animal = await cadastroAnimal.findById(id);

        if (!animal) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }

        return res.status(200).json(animal);
    });

    public update = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nome, especie, idade, tutor, contato } = req.body;

        const updatedAnimal = await cadastroAnimal.findByIdAndUpdate(
            id,
            { nome, especie, idade, tutor, contato },
            { new: true }
        );

        if (!updatedAnimal) {
            return res.status(404).json({ error: 'Animal não encontrado para atualizar' });
        }

        return res.status(200).json(updatedAnimal);
    });

    public delete = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const deletedAnimal = await cadastroAnimal.findByIdAndDelete(id);

        if (!deletedAnimal) {
            return res.status(404).json({ error: 'Animal não encontrado para deletar' });
        }

        return res.status(200).json({ message: 'Animal deletado com sucesso' });
    });
}

export default new AnimalController();
