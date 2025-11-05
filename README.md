# 🛒 E-Commerce MEVN Stack

Une application e-commerce complète utilisant le stack MEVN (MongoDB, Express, Vue.js, Node.js) avec Vuetify pour l'UI et GitHub Actions pour le CI/CD.

## ✨ Fonctionnalités

- **Backend API REST** avec Express.js et Node.js
- **Base de données** MongoDB avec Mongoose
- **Frontend interactif** avec Vue.js 3 et Vuetify
- **Gestion des produits** (CRUD complet)
- **Authentification** (JWT)
- **Recherche et filtres** avancés
- **Panier d'achat**
- **Système de commandes**
- **CI/CD automatique** avec GitHub Actions
- **Docker** pour le développement et la production
- **Tests automatisés** et linting

## 🛠️ Tech Stack

### Backend
- **Node.js** v20.19.0+
- **Express.js** v4.18+
- **MongoDB** v5.0+
- **Mongoose** v7.0+

### Frontend
- **Vue.js** v3.3+
- **Vite** v4.2+
- **Vuetify** v3.1+
- **Axios** v1.3+

### DevOps
- **Docker** & Docker Compose
- **GitHub Actions** pour CI/CD
- **ESLint** pour le linting
- **Jest** pour les tests

## 📋 Prérequis

- Node.js v20.19.0 ou supérieur
- npm ou yarn
- Docker & Docker Compose (optionnel)
- Git
- Un compte MongoDB Atlas (ou MongoDB local)

## 🚀 Installation Rapide

### 1. Cloner le repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-mevn-stack.git
cd ecommerce-mevn-stack
```

### 2. Installation avec npm

```bash
npm run setup
```

### 3. Configuration d'environnement

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 4. Lancer l'application

#### Avec Docker (recommandé)
```bash
docker-compose up
```

#### Sans Docker
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Accéder à l'application

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:5000
- **Docs API**: http://localhost:5000/api-docs (optionnel)

## 📁 Structure du Projet

```
ecommerce-mevn-stack/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       ├── ci.yml
│       ├── deploy-staging.yml
│       └── deploy-production.yml
├── backend/
│   ├── bin/
│   │   └── www             # Entry point
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── app.js              # Express app
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/            # API calls (Axios)
│   │   ├── components/     # Vue components
│   │   ├── pages/          # Page components
│   │   ├── services/       # Business logic
│   │   ├── stores/         # State management (Pinia)
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose setup
├── package.json            # Workspaces
└── README.md
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [CI/CD Guide](./docs/CI-CD.md)

## 🧪 Tests et Linting

```bash
# Linting backend
cd backend && npm run lint

# Linting frontend
cd frontend && npm run lint

# Tests backend
cd backend && npm test

# Tests frontend
cd frontend && npm test

# Linting avec fix
npm run lint:fix --workspaces
```

## 🔐 Variables d'Environnement

### Backend (.env)
```properties
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerceDB
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret_key
API_URL=http://localhost:5000
```

### Frontend (.env)
```properties
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=E-Commerce Store
```

## 🚢 Déploiement

### Avec Heroku

```bash
# Login to Heroku
heroku login

# Create apps
heroku create ecommerce-api
heroku create ecommerce-app

# Set environment variables
heroku config:set MONGODB_URI=... -a ecommerce-api

# Deploy
git push heroku main
```

### Avec Railway

```bash
# Visit https://railway.app
# Connect GitHub repository
# Add services (Backend, Frontend, MongoDB)
# Deploy automatically on push
```

### Avec Docker Hub

```bash
# Build and push images
docker build -t username/ecommerce-backend ./backend
docker push username/ecommerce-backend

docker build -t username/ecommerce-frontend ./frontend
docker push username/ecommerce-frontend
```

## 🔄 Git Workflow

```bash
# Feature branch
git checkout -b feature/feature-name

# Commit and push
git add .
git commit -m "feat: add feature"
git push -u origin feature/feature-name

# Create Pull Request on GitHub

# After review and CI passes
# Merge to develop for staging
# Merge to main for production
```

## 📊 Monitoring

- **Logs**: `docker logs ecommerce-backend`
- **Database**: MongoDB Compass (GUI)
- **API Testing**: Postman / Insomnia
- **Performance**: Chrome DevTools

## 🐛 Troubleshooting

### Port déjà en utilisation

```bash
# Trouver le processus
lsof -i :5000  # Backend
lsof -i :5173  # Frontend

# Tuer le processus
kill -9 <PID>

# Ou utiliser un autre port
export PORT=5001
```

### MongoDB connection refused

```bash
# Vérifier la connexion
mongodb://admin:password123@localhost:27017/ecommerceDB

# Vérifier que MongoDB est lancé
docker ps | grep mongodb

# Relancer MongoDB
docker-compose restart mongodb
```

### Erreurs de certificat SSL

```bash
# Ajouter à la connection string
mongodb+srv://...?retryWrites=true&w=majority
```

## 🤝 Contribution

1. Fork le projet
2. Crée une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

- Email: your.email@example.com
- GitHub: [@yourname](https://github.com/yourname)
- Website: https://yourwebsite.com

## 🙏 Remerciements

- [Vue.js Documentation](https://vuejs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vuetify Documentation](https://vuetifyjs.com/)

---

**Fait avec ❤️ par [Your Name]**
