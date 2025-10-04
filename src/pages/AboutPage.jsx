import Header from "../components/Header";

function AboutPage() {
    return (
        <div className="p-4">
            <Header title="À propos de notre agence GoVoyage!" description="Découvrez notre agence de voyages et notre passion pour l'exploration." />
            <p>
                Notre agence de voyages offre depuis plus de 10 ans des expériences inoubliables à travers le monde. Passionnés de découverte, nous
                sélectionnons les meilleurs forfaits touristiques pour vous faire vivre des voyages d’exception. Que vous rêviez de plages paradisiaques, de villes historiques ou d’aventures en pleine nature, nous avons le forfait qu’il vous faut. Notre équipe dévouée est là pour vous conseiller et vous accompagner dans la planification de votre prochain voyage. Faites confiance à GoVoyage pour transformer vos rêves en réalité!
            </p>
        </div>
    );
}

export default AboutPage;
