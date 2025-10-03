// Service pour gérer les opérations CRUD sur les forfaits

/**
 * Données de forfaits initiales
 */
export const initialPackages = [
    { id: 1, name: "Forfait Paris", description: "Visitez la ville lumière.", price: 499, category: "Ville" },
    { id: 2, name: "Forfait New York", description: "Découvrez la Big Apple.", price: 899, category: "Ville" },
    { id: 3, name: "Forfait Tokyo", description: "Explorez la capitale japonaise.", price: 1299, category: "Ville" },
    { id: 4, name: "Forfait Sydney", description: "Profitez des plages australiennes.", price: 1199, category: "Plage" },
    { id: 5, name: "Forfait Rome", description: "Plongez dans l'histoire antique.", price: 599, category: "Historique" },
    { id: 6, name: "Forfait Le Caire", description: "Admirez les pyramides majestueuses.", price: 699, category: "Historique" },
    { id: 7, name: "Forfait Rio de Janeiro", description: "Vivez le carnaval brésilien.", price: 799, category: "Festival" },
    { id: 8, name: "Forfait Cape Town", description: "Découvrez la beauté sud-africaine.", price: 1099, category: "Nature" },
    { id: 9, name: "Forfait Bangkok", description: "Imprégnez-vous de la culture thaïlandaise.", price: 749, category: "Culturel" },
    { id: 10, name: "Forfait Vancouver", description: "Explorez la nature canadienne.", price: 999, category: "Nature" },
];

/**
 * Ajouter un nouveau forfait
 * @param {Array} packages - Liste actuelle des forfaits
 * @param {Object} formData - Données du formulaire
 * @param {number} nextId - Prochain ID disponible
 * @returns {Object} - { updatedPackages, newNextId }
 */
export const addPackage = (packages, formData, nextId) => {
    const newPackage = {
        id: nextId,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
    };
    return {
        updatedPackages: [...packages, newPackage],
        newNextId: nextId + 1,
    };
};

/**
 * Mettre à jour un forfait existant
 * @param {Array} packages - Liste actuelle des forfaits
 * @param {Object} formData - Données du formulaire
 * @param {number} editingId - ID du forfait à modifier
 * @returns {Array} - Liste des forfaits mise à jour
 */
export const updatePackage = (packages, formData, editingId) => {
    const updatedPackage = {
        id: editingId,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || formData.price,
        category: formData.category,
    };
    return packages.map((p) => (p.id === editingId ? updatedPackage : p));
};

/**
 * Supprimer un forfait
 * @param {Array} packages - Liste actuelle des forfaits
 * @param {number} id - ID du forfait à supprimer
 * @returns {Array} - Liste des forfaits mise à jour
 */
export const deletePackage = (packages, id) => {
    return packages.filter((p) => p.id !== id);
};

/**
 * Valider les données du formulaire
 * @param {Object} formData - Données du formulaire
 * @returns {boolean} - True si valide, False sinon
 */
export const validatePackageForm = (formData) => {
    return !!(formData.name && formData.description && formData.price && formData.category);
};

/**
 * Calculer le prochain ID disponible
 * @param {Array} packages - Liste des forfaits
 * @returns {number} - Prochain ID disponible
 */
export const getNextId = (packages) => {
    return packages.length > 0 ? Math.max(...packages.map((p) => p.id)) + 1 : 1;
};
