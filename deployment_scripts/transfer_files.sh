#!/bin/bash

# File transfer script for AstroGPT Gallants Application
# This script transfers all application files to the server

echo "📤 Starting file transfer to server..."

# Create deployment archive
echo "📦 Creating deployment archive..."
zip -r astroapp_deployment.zip backend/ frontend/ data/ deployment_scripts/ -x "frontend/node_modules/*" "*/.git/*"

# Transfer files to server
echo "🚀 Transferring files to server..."
scp -i "C:\Users\Kartikay Srivastava\.ssh\kartikay-ec2.pem" astroapp_deployment.zip ubuntu@3.108.4.68:/var/www/astroapp/

echo "✅ File transfer completed!"
echo "📁 Files transferred to /var/www/astroapp/ on the server"