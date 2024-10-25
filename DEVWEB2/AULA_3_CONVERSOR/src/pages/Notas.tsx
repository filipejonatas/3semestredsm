import { useState } from "react";

const CalculadoraNota = () => {
    const [nota1, setNota1] = useState<number>(0);
    const [nota2, setNota2] = useState<number>(0);
    const [nota3, setNota3] = useState<number>(0);
    const [atividades, setAtividades] = useState<number>(0);
    const [api, setApi] = useState<number>(0);
    const [resultado, setResultado] = useState<number | null>(null);

    const calcularNotaFinal = () => {
        const peso1 = 0.1;
        const peso2 = 0.1;
        const peso3 = 0.3;
        const pesoAtividades = 0.2;
        const pesoApi = 0.3;

        const notaFinal =
            nota1 * peso1 +
            nota2 * peso2 +
            nota3 * peso3 +
            atividades * pesoAtividades +
            api * pesoApi;

        setResultado(notaFinal);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Calculadora de Nota Final</h1>

            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Nota da Prova 1 (10%)
                    </label>
                    <input
                        type="number"
                        value={nota1}
                        onChange={(e) => setNota1(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Nota da Prova 2 (10%)
                    </label>
                    <input
                        type="number"
                        value={nota2}
                        onChange={(e) => setNota2(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Nota da Prova 3 (30%)
                    </label>
                    <input
                        type="number"
                        value={nota3}
                        onChange={(e) => setNota3(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Nota das Atividades (20%)
                    </label>
                    <input
                        type="number"
                        value={atividades}
                        onChange={(e) => setAtividades(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Nota da API (30%)</label>
                    <input
                        type="number"
                        value={api}
                        onChange={(e) => setApi(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    onClick={calcularNotaFinal}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Calcular Nota Final
                </button>

                {resultado !== null && (
                    <div className="mt-4 text-center text-xl">
                        <strong>Nota Final: </strong>
                        {resultado.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalculadoraNota;