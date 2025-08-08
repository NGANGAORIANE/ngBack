#!/bin/bash

# Variables
AWS_REGION="us-east-1"
CLUSTER_NAME="ngback-cluster"
SERVICE_NAME="ngback-api-service"
TASK_DEFINITION="ngback-api"
IMAGE_URI="YOUR_DOCKERHUB_USERNAME/ngback-api:latest"

# Build et push de l'image Docker
echo "Building Docker image..."
docker build -t $IMAGE_URI .

echo "Pushing to Docker Hub..."
docker push $IMAGE_URI

# Mise à jour de la définition de tâche
echo "Updating task definition..."
aws ecs register-task-definition --cli-input-json file://task-definition.json --region $AWS_REGION

# Mise à jour du service
echo "Updating ECS service..."
aws ecs update-service \
  --cluster $CLUSTER_NAME \
  --service $SERVICE_NAME \
  --task-definition $TASK_DEFINITION \
  --region $AWS_REGION

echo "Deployment completed!" 