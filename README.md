# CineTrack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## Démo en Ligne

[Lien Vercel](https://cinetrack-wheat.vercel.app)

---

## Planification de brief

  [Planification](https://nidalbary.atlassian.net/jira/software/projects/CIN/boards/35?filter=&groupBy=none)

---


## Présentation du Projet

**CineTrack** est une application web moderne et responsive de gestion de catalogue de films et séries. Elle permet aux utilisateurs d'explorer un catalogue multimédia, de filtrer et rechercher des œuvres en temps réel, de consulter les fiches détaillées via une fenêtre modale et de gérer une liste personnalisée de favoris persistante.

### Fonctionnalités Principales

* **Catalogue Dynamique & Pagination** : Affichage des films et séries sous forme de cartes interactives avec navigation par pages (`Prev` / `Next`)
* **Recherche & Filtrage Instantané** : Barre de recherche par titre combinée à un filtre par catégorie (`Tous`, `Movies`, `Series`).
* **Modale de Détails** : Aperçu complet au clic sur une carte (affiche, synopsis, année de sortie, durée ou nombre de saisons, genres, réalisateurs et pays de production).
* **Système de Favoris Persistant** : Ajout et suppression de favoris sauvegardés dans le `localStorage`, accompagnés d'un compteur automatique de films et séries et d'un menu adaptatif (barre latérale fixe sur ordinateur, tiroir mobile sur téléphone).

---

## Technologies

* **HTML5** (Sémantique)
* **Tailwind CSS** (Design responsive Mobile-First)
* **JavaScript ES6+** (Modules ES, manipulation du DOM, `localStorage`)
* **Git & GitHub / Vercel** (Gestion de versions et déploiement)

---

## Structure des Fichiers

```text
├── index.html          # Structure principale, barre de recherche, modale et menu favoris
├── README.md           # Documentation du projet
└── js/
    ├── api.js          # Récupération et chargement des données du catalogue
    ├── dom.js          # Génération dynamique des cartes, de la modale et des favoris
    └── main.js         # Point d'entrée, gestion des événements, de l'état global et du localStorage
