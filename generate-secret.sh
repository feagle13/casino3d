#!/bin/bash
echo "Génération d'une clé secrète NextAuth..."
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo ""
echo "Copiez cette clé dans votre fichier .env.local"
