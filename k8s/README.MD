# MERN Stack Kubernetes Deployment on AWS (Simple Setup)

This repository contains Kubernetes configuration files to deploy a simple MERN (MongoDB, Express.js, React.js, Node.js) stack application using Docker containers on an AWS-hosted Kubernetes cluster (e.g., via EKS or Minikube for local testing).

---

## 📦 Project Structure

This project includes the following Kubernetes resource files:

```bash
.
├── namespace.yaml
├── secret.yaml
├── configmap.yaml
├── backend-deployment.yaml
├── backend-services.yaml
├── frontend-deployment.yaml
├── frontend-services.yaml


---

## 🚀 Prerequisites

- Node.js and Docker installed
- Docker Hub account
- Kubernetes CLI (`kubectl`)
- Minikube or AWS EKS setup
- Your MongoDB connection string (e.g., MongoDB Atlas)

---

## 📦 Docker Images

Ensure you've built and pushed both Docker images to Docker Hub:

```bash
docker build -t <username>/todo-frontend ./client
docker build -t <username/todo-backend ./server

docker push <username/todo-frontend
docker push <username/todo-backend

