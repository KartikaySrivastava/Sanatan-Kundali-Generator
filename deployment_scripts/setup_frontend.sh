#!/bin/bash

# Frontend deployment script for AstroGPT Gallants
echo "⚛️ Setting up React frontend..."

# Navigate to frontend directory
cd /var/www/astroapp/frontend

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Build the frontend for production
echo "🏗️ Building frontend for production..."
npm run build

echo "✅ Frontend build completed!"