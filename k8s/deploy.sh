@echo off

REM Enable Kubernetes in Docker Desktop if not enabled
echo "Ensuring Kubernetes is enabled..."
timeout /t 10

REM Build the Docker image
docker build -t product-management:latest ..

REM Apply Kubernetes configurations
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

REM Wait for deployment to be ready
kubectl rollout status deployment/product-management-app

echo "Deployment completed! Access your application at: products.example.com"
pause
