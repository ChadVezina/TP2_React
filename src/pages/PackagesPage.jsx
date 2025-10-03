import { useState } from "react";
import { initialPackages, addPackage, updatePackage, deletePackage, validatePackageForm, getNextId } from "../services/packageService";

function PackagesPage() {
    const [packages, setPackages] = useState(initialPackages);
    const [nextId, setNextId] = useState(getNextId(initialPackages));
    const [editingId, setEditingId] = useState(null); // null Si on ajoute un nouveau forfait
    const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "" }); //Champs de formulaire

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
        const updatedPackages = deletePackage(packages, id);
        setPackages(updatedPackages);
        if (id === editingId) {
            setEditingId(null);
            setFormData({ name: "", description: "", price: "", category: "" });
        }
    };
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Forfaits touristiques</h2>

            {/* Formulaire d'ajout/édition de forfait */}
            <form onSubmit={handleSubmit} className="max-w-md p-4 mb-6 bg-gray-100 rounded">
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
            <div>
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
    );
}
export default PackagesPage;
