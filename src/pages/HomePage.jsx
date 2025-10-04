import Header from "../components/Header";

function HomePage() {
    return (
        <>
            <Header title="Bienvenue à GoVoyage!" description="Votre partenaire pour des aventures inoubliables" />
            <main className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-96">
                <div className="bg-slate-200 shadow-lg rounded p-4 mb-4">
                    <h2 className="text-2xl font-bold mb-2 text-slate-800">Nos Destinations</h2>
                    <p>Explorez nos forfaits de voyage vers des destinations de rêve.</p>
                </div>
                <div className="bg-slate-200 shadow-lg rounded p-4 mb-4">
                    <h2 className="text-2xl font-bold mb-2 text-slate-800">En savoir plus</h2>
                    <p>Pour plus d'informations sur nos services, n'hésitez pas à nous contacter.</p>
                </div>
            </main>
        </>
    );
}

export default HomePage;
