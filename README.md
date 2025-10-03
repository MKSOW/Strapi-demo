📰 Mon Blog – Strapi + React
🚀 Description

Ce projet est une application Blog composée de :

Backend : Strapi v5 

📂 Structure du projet

⚙️ Prérequis

Avant de démarrer, assurez-vous d’avoir installé :

Node.js : v18 ou supérieur (jusqu’à v22.x)

npm : v8 ou supérieur

Base de données : SQLite (par défaut avec Strapi, aucun setup supplémentaire) 

🔑 Variables d’environnement
Backend (mon-blog/.env)

Créez un fichier .env dans le dossier mon-blog avec le contenu suivant : 

# Application
APP_KEYS=someRandomSecretKeys
API_TOKEN_SALT=someRandomSalt
ADMIN_JWT_SECRET=someAdminJwtSecret
TRANSFER_TOKEN_SALT=someRandomTransferSalt

# Database (SQLite par défaut)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# URL
HOST=0.0.0.0
PORT=1337
URL=http://localhost:1337

Frontend (mon-blog-frontend/.env) 
Créez un fichier .env dans mon-blog-frontend : 
VITE_API_URL=http://localhost:1337/api
⚠️ Le frontend utilise VITE_API_URL pour interagir avec l’API Strapi. 
▶️ Lancer le projet 
Backend (Strapi) 
cd mon-blog
npm install
npm run develop
 
👉 Accès Strapi Admin : http://localhost:1337/admin 

Frontend (React + Vite)
cd mon-blog-frontend
npm install
npm run dev

👉 Accès frontend : http://localhost:5173 
✅ Fonctionnalités

Création, édition et suppression d’articles via Strapi.

Téléversement d’images pour illustrer les articles.

Gestion des utilisateurs/auteurs (relation Article → Auteur).

Ajout et affichage des commentaires liés à chaque article.

Frontend en React affichant la liste des articles et leur contenu détaillé.