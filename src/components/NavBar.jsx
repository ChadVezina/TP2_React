import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-4 items-center">
            <span className="font-bold text-2xl mr-14">GoVoyage!</span>
            <Link to="/">Accueil</Link>
            <Link to="/forfaits">Forfaits</Link>
            <Link to="/a-propos">À propos</Link>
        </nav>
    );
}

export default NavBar;
