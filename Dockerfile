# Utilise une image Node officielle
FROM node:20

# Crée un dossier de travail
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port utilisé par Express
EXPOSE 3000

# Démarre l’application
CMD ["node", "index.js"]
