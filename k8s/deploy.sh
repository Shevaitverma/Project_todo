#!/bin/bash

# Deploy Todo App to Kubernetes
echo "🚀 Deploying Todo App to Kubernetes..."

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Apply ConfigMap and Secret
echo "🔧 Applying ConfigMap and Secret..."
kubectl apply -f configmap.yaml -n todo-app
kubectl apply -f secret.yaml -n todo-app

# Deploy backend
echo "🔙 Deploying backend..."
kubectl apply -f backend-deployment.yaml -n todo-app
kubectl apply -f backend-service.yaml -n todo-app

# Deploy frontend
echo "🎨 Deploying frontend..."
kubectl apply -f frontend-deployment.yaml -n todo-app
kubectl apply -f frontend-service.yaml -n todo-app

# Wait for deployments to be ready
echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/backend -n todo-app
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n todo-app

# Show status
echo "📊 Deployment Status:"
kubectl get all -n todo-app

echo "✅ Deployment completed!"
echo ""
echo "🌐 Access your application:"
echo "Frontend (LoadBalancer): Check the external IP with: kubectl get svc frontend -n todo-app"
echo "Backend (ClusterIP): Internal service at http://backend:4001"
echo ""
echo "📝 To check logs:"
echo "kubectl logs -f deployment/backend -n todo-app"
echo "kubectl logs -f deployment/frontend -n todo-app"
echo ""
echo "🔍 To check if services can communicate:"
echo "kubectl exec -it deployment/frontend -n todo-app -- curl http://backend:4001/health" 