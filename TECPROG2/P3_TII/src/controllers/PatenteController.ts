import { Request, Response } from "express";
import { Patente } from "../models/index"

class PatenteController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { codigo, descricao } = req.body;

        try {
            const patente = new Patente({ codigo, descricao });
            const result = await patente.save();
            return res.json(result);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }


    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const patentes = await Patente.find().sort({ descricao: 'asc' });
            return res.json(patentes);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }


    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { codigo, descricao } = req.body;

        try {
            const updatedPatente = await Patente.findByIdAndUpdate(
                id,
                { codigo, descricao },
                { new: true, runValidators: true }
            );

            if (!updatedPatente) {
                return res.json({ message: "Patente não encontrada" });
            }

            return res.json(updatedPatente);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }


    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deletedPatente = await Patente.findByIdAndDelete(id);

            if (!deletedPatente) {
                return res.json({ message: "Patente não encontrada" });
            }

            return res.json({ message: "Patente removida com sucesso" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new PatenteController();
