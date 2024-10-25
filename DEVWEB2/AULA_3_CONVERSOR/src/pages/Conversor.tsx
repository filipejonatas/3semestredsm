import { useState } from "react";

const Conversor = () => {
    const [kg, setKg] = useState("");
    const [km, setKm] = useState("");
    const [celsius, setCelsius] = useState("");

    const convertKgToGrams = (kg: string) => (parseFloat(kg) * 1000).toFixed(2);
    const convertKmToMeters = (km: string) => (parseFloat(km) * 1000).toFixed(2);
    const convertCelsiusToFahrenheit = (celsius: string) =>
        ((parseFloat(celsius) * 9) / 5 + 32).toFixed(2);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Conversor de Unidades</h1>

            <div className="mb-4 w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Kg para Gramas</h2>
                <input
                    type="number"
                    placeholder="Digite o valor em kg"
                    value={kg}
                    onChange={(e) => setKg(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                {kg && (
                    <p className="mt-2 text-gray-700">
                        {kg} kg = {convertKgToGrams(kg)} g
                    </p>
                )}
            </div>

            <div className="mb-4 w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Km para Metros</h2>
                <input
                    type="number"
                    placeholder="Digite o valor em km"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                {km && (
                    <p className="mt-2 text-gray-700">
                        {km} km = {convertKmToMeters(km)} metros
                    </p>
                )}
            </div>

            <div className="mb-4 w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Celsius para Fahrenheit</h2>
                <input
                    type="number"
                    placeholder="Digite o valor em °C"
                    value={celsius}
                    onChange={(e) => setCelsius(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                {celsius && (
                    <p className="mt-2 text-gray-700">
                        {celsius} °C = {convertCelsiusToFahrenheit(celsius)} °F
                    </p>
                )}
            </div>
        </div>
    );
};

export default Conversor