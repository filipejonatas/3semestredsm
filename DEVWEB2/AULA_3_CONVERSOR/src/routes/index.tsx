import { Route, Routes } from "react-router-dom";
import NavBar from "../components/Nav";
import Conversor from "../pages/Conversor";
import CalculadoraNota from "../pages/Notas";

function Rotas() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/conversor" element={<Conversor />} />
                <Route path="/notas" element={<CalculadoraNota />} />
            </Routes>
        </>
    );
};

export default Rotas;