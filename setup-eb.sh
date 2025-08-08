#!/bin/bash

# Variables
AWS_REGION="us-east-1"
APP_NAME="ngback-api"
ENV_NAME="ngback-api-prod"
PLATFORM="Node.js 18"

echo "🚀 Configuration d'Elastic Beanstalk pour $APP_NAME"

# Vérifier si AWS CLI est installé
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI n'est pas installé. Installez-le d'abord."
    exit 1
fi

# Vérifier les credentials AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials non configurés. Configurez aws configure d'abord."
    exit 1
fi

echo "✅ AWS CLI configuré"

# Créer l'application Elastic Beanstalk
echo "📦 Création de l'application Elastic Beanstalk..."
aws elasticbeanstalk create-application \
    --application-name $APP_NAME \
    --description "API Nkwagabon - Gestion des restaurants, événements et lieux" \
    --region $AWS_REGION

# Créer l'environnement de production
echo "🌍 Création de l'environnement de production..."
aws elasticbeanstalk create-environment \
    --application-name $APP_NAME \
    --environment-name $ENV_NAME \
    --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 18" \
    --option-settings \
        Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role \
        Namespace=aws:elasticbeanstalk:environment,OptionName=EnvironmentType,Value=SingleInstance \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=NODE_ENV,Value=production \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=PORT,Value=8080 \
    --region $AWS_REGION

echo "✅ Configuration terminée !"
echo "📋 Application: $APP_NAME"
echo "🌍 Environnement: $ENV_NAME"
echo "🌐 Région: $AWS_REGION"
echo ""
echo "🔗 Votre API sera disponible sur: http://$ENV_NAME.$APP_NAME.$AWS_REGION.elasticbeanstalk.com" 