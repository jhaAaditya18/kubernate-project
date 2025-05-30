﻿# Kubernate Project

# Node.js Web App with MongoDB on Kubernetes

This project contains a Node.js web application deployed on Kubernetes, with MongoDB as the database. The app is containerized using Docker and managed using multiple Kubernetes YAML files including deployment, services, and persistent volume configurations.

## 🧰 Tech Stack

- Node.js
- Express.js (optional, if applicable)
- MongoDB
- Docker
- Kubernetes
- YAML (for K8s configurations)

## 📁 Project Structure

├── Dockerfile
├── k8s/
│ ├── deployment-app.yml
│ ├── deployment-mongo.yml
│ ├── service-app.yml
│ ├── service-mongo.yml
│ ├── persistent-volume.yml
│ └── persistent-volume-claim.yml
├── src/
│ └── index.js
├── .dockerignore
├── .gitignore
└── README.md

bash
Copy
Edit

## 🚀 Getting Started

### 1. Clone the Repository

```bash

git clone https://github.com/yourusername/your-k8s-node-app.git
cd your-k8s-node-app
```

2. Build and Push Docker Image
Update Docker Hub username and image name in your deployment YAML files.

bash
Copy
Edit
docker build -t yourusername/node-k8s-app .
docker push yourusername/node-k8s-app
3. Deploy to Kubernetes
Make sure kubectl is configured to point to your cluster.

bash
Copy
Edit
kubectl apply -f k8s/persistent-volume.yml
kubectl apply -f k8s/persistent-volume-claim.yml
kubectl apply -f k8s/deployment-mongo.yml
kubectl apply -f k8s/service-mongo.yml
kubectl apply -f k8s/deployment-app.yml
kubectl apply -f k8s/service-app.yml



4. Access the Application
Depending on your service type (NodePort, LoadBalancer, etc.), you can access your app via browser or curl:
bash
Copy
Edit
minikube service service-app


🗃️ Persistent Volume
MongoDB uses a Persistent Volume Claim (persistent-volume-claim.yml) to store data persistently even if the pod restarts.


🐳 Dockerfile
Ensure your Dockerfile includes everything necessary to run the Node.js app. Here's a basic example:

Dockerfile
Copy
Edit
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]


🧪 Testing
Make sure MongoDB is connected by checking logs:

bash
Copy
Edit
kubectl logs <mongodb-pod-name>
kubectl logs <node-app-pod-name>
📦 Cleanup
bash
Copy
Edit
kubectl delete -f k8s/
📄 License
This project is licensed under the MIT License.

vbnet
Copy
Edit
Would you like me to generate the actual Kubernetes YAML files too?



Overview
📦 Project Overview
This project is a full-stack  but not fully fulsatck its a small part where we tried to store email which is given to the front end and stored in db and deployment of a Node.js web application with MongoDB as its database, orchestrated using Kubernetes. It utilizes multiple YAML configuration files for modular deployment, ensures data durability with persistent volumes, and is containerized using a custom Dockerfile.

✅ Key Components
Node.js Web App
The backend of the application is built using Node.js (optionally with Express). It handles HTTP requests and interacts with MongoDB for data storage.
MongoDB
A NoSQL database used to persist application data. It is deployed as a separate Kubernetes pod with its own service and uses a Persistent Volume to retain data even when the pod restarts or reschedules.

Dockerfile
The application is containerized using a Dockerfile. It defines the base image, dependencies, and the startup command.
Kubernetes YAML Files
Deployment and configuration are managed using multiple .yml files:

deployment-app.yml – Deploys the Node.js app.

deployment-mongo.yml – Deploys MongoDB.

service-app.yml – Exposes the Node.js app within the cluster (or externally, depending on the service type).

service-mongo.yml – Exposes MongoDB internally to be accessed by the app.

persistent-volume.yml – Defines a static persistent volume (PV).

persistent-volume-claim.yml – Requests storage using a Persistent Volume Claim (PVC).

Persistent Volume
The MongoDB pod is connected to a Persistent Volume to ensure that its data is not lost across restarts. This improves the reliability of the database.
Kubernetes Services
Services are defined to enable communication between pods. The Node.js app communicates with the MongoDB service using an internal DNS name.

