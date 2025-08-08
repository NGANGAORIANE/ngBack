# 🚀 Guide de Déploiement AWS Elastic Beanstalk

## Prérequis

### 1. Compte AWS
- Créer un compte AWS si vous n'en avez pas
- Activer MFA pour la sécurité

### 2. AWS CLI
```bash
# Installer AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configurer AWS CLI
aws configure
```

### 3. Permissions IAM
Créer un utilisateur IAM avec les permissions suivantes :
- `AWSElasticBeanstalkFullAccess`
- `AWSElasticBeanstalkService`

## Configuration

### 1. Configurer les secrets GitHub
Dans votre repository GitHub :
1. Aller dans **Settings > Secrets and variables > Actions**
2. Ajouter les secrets :
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

### 2. Créer l'application Elastic Beanstalk

#### Option A : Via script automatique
```bash
chmod +x setup-eb.sh
./setup-eb.sh
```

#### Option B : Via console AWS
1. Aller sur [AWS Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk/)
2. Cliquer sur **Create Application**
3. Nom : `ngback-api`
4. Platform : `Node.js`
5. Platform branch : `Node.js 18`
6. Platform version : `Latest`
7. Application code : `Upload your code`
8. Cliquer sur **Create application**

## Déploiement

### Déploiement automatique (Recommandé)
1. Pousser votre code sur la branche `main` ou `master`
2. GitHub Actions va automatiquement :
   - Exécuter les tests
   - Déployer sur Elastic Beanstalk si les tests passent

### Déploiement manuel
```bash
# Installer EB CLI
pip install awsebcli

# Initialiser EB
eb init

# Créer l'environnement
eb create production

# Déployer
eb deploy
```

## Vérification

### 1. Vérifier le statut
```bash
# Via AWS CLI
aws elasticbeanstalk describe-environments \
  --application-name ngback-api \
  --environment-names ngback-api-prod

# Via console AWS
# Aller sur la console Elastic Beanstalk
```

### 2. Tester l'API
```bash
# Remplacer par votre URL
curl https://ngback-api-prod.ngback-api.us-east-1.elasticbeanstalk.com/

# Réponse attendue
# "API Nkwagabon fonctionne ✅"
```

## Monitoring

### 1. Logs
- Console AWS > Elastic Beanstalk > Environnement > Logs
- Ou via AWS CLI : `eb logs`

### 2. Métriques
- CPU, mémoire, réseau
- Nombre de requêtes
- Temps de réponse

### 3. Alertes
Configurer des alertes CloudWatch pour :
- CPU > 80%
- Mémoire > 80%
- Erreurs 5xx

## Variables d'environnement

Dans la console Elastic Beanstalk :
1. Aller dans **Configuration**
2. **Software**
3. Ajouter les variables :
   - `NODE_ENV=production`
   - `PORT=8080`
   - Variables Supabase (si nécessaire)

## Scaling

### Auto Scaling
- Minimum : 1 instance
- Maximum : 3 instances
- Métrique : CPU > 70%

### Load Balancer
- Type : Application Load Balancer
- Health check : `/` (200 OK)

## Coûts estimés

- **t3.micro** : ~$8-10/mois
- **Transfert de données** : ~$1-5/mois
- **Total estimé** : ~$10-15/mois

## Troubleshooting

### Problèmes courants

1. **Application ne démarre pas**
   - Vérifier les logs : `eb logs`
   - Vérifier le port dans `.ebextensions`

2. **Erreurs de dépendances**
   - Vérifier `package.json`
   - Vérifier `node_modules` dans `.ebignore`

3. **Variables d'environnement**
   - Vérifier dans la console EB
   - Redémarrer l'environnement

### Commandes utiles
```bash
# Voir les logs
eb logs

# Redémarrer l'environnement
eb restart

# Voir le statut
eb status

# Ouvrir l'application
eb open
```

## Sécurité

### 1. HTTPS
- Configurer un certificat SSL
- Rediriger HTTP vers HTTPS

### 2. Firewall
- Limiter l'accès aux IPs nécessaires
- Utiliser Security Groups

### 3. Variables sensibles
- Ne jamais commiter `.env`
- Utiliser les variables d'environnement EB

## Support

- [Documentation AWS Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Forum AWS](https://forums.aws.amazon.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-elastic-beanstalk) 