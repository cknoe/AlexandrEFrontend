# FrontendReact

Application frontend réalisée avec **React**, **TypeScript** et **Vite**.

## Démarrage

En local

```sh
yarn install
yarn dev
```

En LAN (nécessite .env.host)

```sh
yarn install
yarn dev:host
```

Accède à l’application sur [http://localhost:5173](http://localhost:5173).

## Scripts

- `yarn dev` : Lance le serveur de développement
- `yarn build` : Build de production
- `yarn preview` : Prévisualisation du build
- `yarn lint` : Vérifie la qualité du code avec ESLint
- `yarn format` : Formate le code avec Prettier

## Structure du projet

- `src/components/` : Composants React (Header, Modal, Cards, LoginForm, Error)
- `src/css/` : Fichiers de styles CSS
- `src/assets/` : Images et ressources statiques
- `public/` : Fichiers publics (favicon, images)
- `src/App.tsx` : Composant principal
- `src/Routes.tsx` : Routing de l’application

## Fonctionnalités

- Ajout, suppression et affichage de cartes
- Modale contextuelle
- Formulaire de connexion
- Routing avec React Router

## Qualité du code

- ESLint et Prettier sont configurés pour garantir la qualité et la cohérence du code.
