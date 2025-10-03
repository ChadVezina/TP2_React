import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
            <Link to="/">Accueil</Link>
            <Link to="/about">Forfaits</Link>
            <Link to="/contact">À propos</Link>
        </nav>
    );
}

export default NavBar;
