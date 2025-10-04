import { useEffect, useState } from "react";
import {
    initialPackages,
    addPackage,
    updatePackage,
    deletePackage,
    validatePackageForm,
    getNextId,
    fetchPackagesFromServer,
    createPackageOnServer,
    updatePackageOnServer,
    deletePackageOnServer,
} from "../services/packageService";
import Header from "../components/Header";

function PackagesPage() {
    const [packages, setPackages] = useState(initialPackages);
    const [nextId, setNextId] = useState(getNextId(initialPackages));
    const [editingId, setEditingId] = useState(null); // null Si on ajoute un nouveau forfait
    const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "" }); //Champs de formulaire
    const [useServer, setUseServer] = useState(false); // Indique si les données proviennent du serveur
    const [serverAvailable, setServerAvailable] = useState(false); // Indique si le serveur est disponible

    useEffect(() => {
        fetchPackagesFromServer()
            .then((data) => {
                setPackages(data);
                setUseServer(true);
                setServerAvailable(true);
            })
            .catch((error) => {
                console.error("Json Server non disponible, utilisation des données locales.", error);
                setUseServer(false);
                setServerAvailable(false);
            });
    }, []);

    // Gérer le changement de source de données (client/serveur)
    const handleToggleDataSource = () => {
        if (!serverAvailable && !useServer) {
            alert("Le serveur n'est pas disponible. Impossible de basculer vers le mode serveur.");
            return;
        }

        const newUseServer = !useServer;
        setUseServer(newUseServer);

        if (newUseServer) {
            // Charger les données depuis le serveur
            fetchPackagesFromServer()
                .then((data) => {
                    setPackages(data);
                    setServerAvailable(true);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des données du serveur:", error);
                    alert("Impossible de se connecter au serveur. Retour aux données locales.");
                    setUseServer(false);
                    setServerAvailable(false);
                });
        } else {
            // Charger les données locales
            setPackages(initialPackages);
            setNextId(getNextId(initialPackages));
        }

        // Réinitialiser le formulaire
        setFormData({ name: "", description: "", price: "", category: "" });
        setEditingId(null);
    };

    // Gérer les changements dans les champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gérer la soumission du formulaire (ajout ou modification)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePackageForm(formData)) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        if (!useServer) {
            // Utiliser les données locales
            if (editingId === null) {
                // Ajouter un nouveau forfait
                const { updatedPackages, newNextId } = addPackage(packages, formData, nextId);
                setPackages(updatedPackages);
                setNextId(newNextId);
            } else {
                // Mettre à jour un forfait existant
                const updatedPackages = updatePackage(packages, formData, editingId);
                setPackages(updatedPackages);
            }
            setFormData({ name: "", description: "", price: "", category: "" });
            setEditingId(null);
        }
        // Utiliser Json Server
        else {
            if (editingId === null) {
                // Ajouter un nouveau forfait
                createPackageOnServer(formData)
                    .then((data) => {
                        setPackages((prev) => [...prev, data]);
                        setFormData({ name: "", description: "", price: "", category: "" });
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'ajout du forfait :", error);
                    });
            } else {
                // Mettre à jour un forfait existant
                updatePackageOnServer(editingId, formData)
                    .then((data) => {
                        setPackages((prev) => prev.map((pkg) => (pkg.id === editingId ? data : pkg)));
                        setFormData({ name: "", description: "", price: "", category: "" });
                        setEditingId(null);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la mise à jour du forfait :", error);
                    });
            }
        }
    };

    // Gérer la modification d'un forfait existant
    const handleEdit = (pkg) => {
        setEditingId(pkg.id);
        setFormData({
            name: pkg.name,
            description: pkg.description,
            price: pkg.price.toString(),
            category: pkg.category,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Gérer la suppression d'un forfait
    const handleDelete = (id) => {
        if (!useServer) {
            const updatedPackages = deletePackage(packages, id);
            setPackages(updatedPackages);
            if (id === editingId) {
                setEditingId(null);
                setFormData({ name: "", description: "", price: "", category: "" });
            }
        } else {
            deletePackageOnServer(id)
                .then(() => {
                    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
                    if (id === editingId) {
                        setEditingId(null);
                        setFormData({ name: "", description: "", price: "", category: "" });
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression du forfait :", error);
                });
        }
    };
    return (
        <div className="p-4 mb-10">
            <Header title="Gestion des Forfaits" description="Ajoutez, modifiez ou supprimez des forfaits touristiques" />

            {/* Toggle pour choisir la source de données */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Source de données</h3>
                        <p className="text-sm text-gray-600">
                            Mode actuel: <span className="font-medium">{useServer ? "Serveur (JSON Server)" : "Client (données locales)"}</span>
                        </p>
                        {!serverAvailable && <p className="text-xs text-orange-600 mt-1">⚠️ Le serveur n'est pas disponible</p>}
                    </div>
                    <button
                        onClick={handleToggleDataSource}
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            useServer ? "bg-green-600" : "bg-gray-400"
                        }`}
                        title={useServer ? "Basculer vers les données locales" : "Basculer vers le serveur"}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                useServer ? "translate-x-9" : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    {useServer ? (
                        <span>✓ Les modifications seront sauvegardées sur le serveur</span>
                    ) : (
                        <span>✓ Les modifications seront temporaires (données locales)</span>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formulaire d'ajout/édition de forfait */}
                <form onSubmit={handleSubmit} className="max-w-full max-h-fit p-4 mb-6 bg-gray-100 rounded">
                    <h3 className="text-lg font-semibold mb-3">{editingId ? "Modifier le forfait" : "Ajouter un nouveau forfait"}</h3>
                    <div className="mb-2">
                        <label className="block font-medium">Nom du forfait :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-1 w-full" required />
                    </div>
                    <div className="mb-2">
                        <label className="block font-medium">Description :</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-medium">Prix :</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-1 w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Catégorie :</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            placeholder="e.g. Plage, Aventure..."
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        {editingId ? "Mettre à jour" : "Ajouter"}
                    </button>
                </form>

                {/* Liste des forfaits */}
                <div className="grid md:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="border p-3 mb-3 flex justify-between items-center">
                            {/* Informations du forfait */}
                            <div>
                                <div className="font-semibold">
                                    {pkg.name} – {pkg.price}$ <span className="italic text-sm">({pkg.category})</span>
                                </div>
                                <div className="text-sm text-gray-700">{pkg.description}</div>
                            </div>
                            {/* Boutons actions */}
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(pkg)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(pkg.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                    {packages.length === 0 && <p className="text-gray-500">Aucun forfait disponible pour le moment.</p>}
                </div>
            </div>
        </div>
    );
}
export default PackagesPage;
