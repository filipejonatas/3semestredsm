class PatenteModel {
    id: string = ''
    descricao: string
    codigo: number

    constructor(descricao: string, codigo: number) {
        this.descricao = descricao;
        this.codigo = codigo;
    }
}

export default PatenteModel;
