La Petite Pygmée — Site web

## Structure

```
/
├── index.html              → Accueil (aperçu + menu + galerie)
├── pages/
│   ├── about.html          → À propos
│   ├── restaurants.html    → Liste des établissements
│   ├── contact.html        → Contact
│   ├── reservation.html    → Réservation
│   └── establishments/
│       ├── bertoua-agence-1.html
│       ├── bertoua-agence-2.html
│       └── yaounde-agence-3.html
├── css/style.css
├── js/
│   ├── layout.js           → Header & footer partagés
│   ├── main.js             → Navigation, onglets menu, recherche
│   ├── search.js
│   └── reservation.js
└── images (racine)         → 1.jpg, logo.png, etc.
```

## Navigation

Toutes les pages partagent le même en-tête et pied de page via `js/layout.js` :
- Accueil · À propos · Nos établissements · Menu · Galerie · Contact
- Bouton **Réserver une table** → `pages/reservation.html`

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou servir le dossier avec un serveur local.
