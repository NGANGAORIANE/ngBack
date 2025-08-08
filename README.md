# API Nkwagabon

API Express.js pour la gestion des restaurants, événements et lieux.

## 🚀 Installation

```bash
npm install
```

## 🏃‍♂️ Démarrage

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

## 🧪 Tests

### Exécuter tous les tests
```bash
npm test
```

### Exécuter les tests en mode watch
```bash
npm run test:watch
```

### Exécuter les tests avec couverture
```bash
npm run test:coverage
```

## 📁 Structure des tests

```
tests/
├── controllers/          # Tests unitaires des contrôleurs
│   └── eventsController.test.js
├── integration/          # Tests d'intégration des routes
│   └── app.test.js
└── utils/               # Tests des fonctions utilitaires
```

## 🐳 Docker

### Build de l'image
```bash
docker build -t ngback-api .
```

### Exécution du conteneur
```bash
docker run -p 3000:3000 ngback-api
```

## 🔄 CI/CD

Le projet utilise GitHub Actions pour :
- Exécuter les tests automatiquement sur chaque push/PR
- Déployer automatiquement sur AWS Elastic Beanstalk si les tests passent

### Secrets requis

Dans les paramètres GitHub du repository, ajouter :
- `AWS_ACCESS_KEY_ID` : Clé d'accès AWS
- `AWS_SECRET_ACCESS_KEY` : Clé secrète AWS

## 🚀 Déploiement

### Déploiement automatique
1. Pousser le code sur la branche `main` ou `master`
2. GitHub Actions déploie automatiquement sur Elastic Beanstalk

### Déploiement manuel
Voir le guide complet dans [DEPLOYMENT.md](./DEPLOYMENT.md)

### URL de production
Après déploiement, votre API sera disponible sur :
```
https://ngback-api-prod.ngback-api.us-east-1.elasticbeanstalk.com
```

## 📊 Endpoints

- `GET /` - Statut de l'API
- `GET /restaurants` - Liste des restaurants
- `GET /events` - Liste des événements
- `GET /places` - Liste des lieux

## 🛠️ Technologies

- Node.js
- Express.js
- Supabase
- Jest (tests)
- Docker
- GitHub Actions 