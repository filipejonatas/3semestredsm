import { Request, Response } from "express";
import { Militar } from "../models";

class MilitarController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, idade, email, fone } = req.body
        try {
            const document = new Militar({ nome, idade, email, fone });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000) {
                // Erro de índice único (e-mail duplicado, por exemplo)
                return res.json({ message: "E-mail já está em uso!" });
            } else if (error.errors) {
                // Retorna erros específicos de validação do Mongoose
                const messages = Object.values(error.errors).map((err: any) => err.message);
                return res.status(400).json({ errors: messages });
            }
            return res.json({ message: error.message });
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const documents = await Militar.find().sort({ nome: 'asc' });
            return res.json(documents);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Atualização de um Militar por ID
    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { nome, idade, email, fone } = req.body;
        try {
            const document = await Militar.findByIdAndUpdate(
                id,
                { nome, idade, email, fone },
                { new: true, runValidators: true } // Retorna o documento atualizado e valida os campos
            );
            if (!document) {
                return res.json({ message: "Militar não encontrado!" });
            }
            return res.json(document);
        } catch (error: any) {
            if (error.errors) {
                // Retorna erros específicos de validação do Mongoose
                const messages = Object.values(error.errors).map((err: any) => err.message);
                return res.json({ errors: messages });
            }
            return res.json({ message: error.message });
        }
    }

    // Remoção de um Militar por ID
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const document = await Militar.findByIdAndDelete(id);
            if (!document) {
                return res.json({ message: "Militar não encontrado!" });
            }
            return res.json({ message: "Militar removido com sucesso!" });
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new MilitarController();