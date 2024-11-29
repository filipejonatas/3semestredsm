import { Request, Response } from "express";
import { Soldado, Militar } from "../models";

class SoldadoController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { cim, altura, militar } = req.body;

        try {
            const militarEncontrado = await Militar.findById(militar);

            if (!militarEncontrado) {
                return res.json({ message: "Militar não encontrado." });
            }
            const newSoldado = new Soldado({
                cim,
                altura,
                militar: militarEncontrado._id,
            });
            const savedSoldado = await newSoldado.save();
            return res.json(savedSoldado);
        } catch (error: any) {
            // Erro de duplicação de chave única
            if (error.code === 11000) {
                return res.json({ message: "CIM já está em uso ou Militar já está associado!" });
            }
            return res.json({ message: error.message });
        }
    }


    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const soldados = await Soldado.find().populate("militar");
            return res.json(soldados);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { cim, altura, militar } = req.body;

        try {
            if (militar) {
                const militarEncontrado = await Militar.findById(militar);
                if (!militarEncontrado) {
                    return res.json({ message: "Militar não encontrado" });
                }
            }
            const updatedSoldado = await Soldado.findByIdAndUpdate(
                id,
                { cim, altura, militar },
                { new: true, runValidators: true }
            ).populate("militar");

            if (!updatedSoldado) {
                return res.json({ message: "Soldado não encontrado!" });
            }

            return res.json(updatedSoldado);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deletedSoldado = await Soldado.findByIdAndDelete(id);

            if (!deletedSoldado) {
                return res.status(404).json({ message: "Soldado não encontrado!" });
            }

            return res.json({ message: "Soldado removido com sucesso!" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new SoldadoController();
