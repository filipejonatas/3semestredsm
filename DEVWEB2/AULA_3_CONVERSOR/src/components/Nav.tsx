import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-red-800 p-4 text-white flex justify around" >
            <button className="hover:bg-red-700 p-2 rounded"
                onClick={() => navigate("/conversor")}>
                Conversor
            </button>
            <button className="hover:bg-red-700 p-2 rounded"
                onClick={() => navigate("/notas")}>
                Calculadora de Notas
            </button>
        </nav>
    );
};

export default NavBar