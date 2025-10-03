import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import AboutPage from "./pages/AboutPage";
function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/forfaits" element={<PackagesPage />} />
                <Route path="/a-propos" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
