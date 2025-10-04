# Agence de voyage — front React

Ce dépôt contient une application front-end React (bootstrapped avec Create React App) utilisée pour un TP/mini-projet d'une agence de voyage. Le projet inclut un mini-backend mock avec `json-server` qui sert les données depuis `src/db.json`.

## Pré-requis

-   Node.js (>= 16 recommandé)
-   npm (ou yarn)

## Installation

1. Cloner le dépôt

    git clone https://github.com/ChadVezina/TP2_React.git

2. Installer les dépendances

```bash
npm install
```

## Scripts utiles

Les scripts définis dans `package.json` :

-   `npm start` : lance l'application React en mode développement (http://localhost:3000).
-   `npm run server` : lance `json-server` et sert `src/db.json` sur le port 3001 (http://localhost:3001).
-   `npm run build` : construit l'application pour la production dans le dossier `build`.
-   `npm test` : lance la suite de tests fournie par Create React App.
-   `npm run eject` : éjecte la configuration Create React App (opération irréversible).

Exécuter l'application et le serveur de données simultanément dans deux terminaux :

```bash
npm run server
npm start
```

## Structure du projet

Arborescence principale (fichiers importants) :

-   `public/` : fichiers statiques (index.html, manifest, images).
-   `src/` : code source React
    -   `App.js` : point d'entrée de l'application
    -   `index.js` : bootstrap React
    -   `index.css` : styles globaux (Tailwind configuré)
    -   `db.json` : données mock utilisées par `json-server`
    -   `components/` : composants réutilisables (`Header.jsx`, `Footer.jsx`, `NavBar.jsx`)
    -   `pages/` : pages de l'application (`HomePage.jsx`, `AboutPage.jsx`, `PackagesPage.jsx`)
    -   `services/packageService.js` : service pour récupérer les packages depuis l'API mock

## Dépendances principales

-   React 19
-   react-router-dom (pour le routage)
-   json-server (devDependency pour mock API)

Voir la section `dependencies` et `devDependencies` dans `package.json` pour la liste complète et versions.

## Exemples d'utilisation

Après `npm install` et avoir lancé `npm run server` :

-   Ouvrir `http://localhost:3000` pour utiliser l'application.
-   L'API mock est disponible sur `http://localhost:3001/packages` (selon les routes définies dans `src/db.json`).

