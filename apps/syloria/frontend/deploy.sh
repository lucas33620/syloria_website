#!/bin/bash
set -e

echo "➡️  Build du frontend..."
npm run build

echo "➡️  Déploiement vers /var/www/syloria..."
sudo rsync -av --delete dist/ /var/www/syloria/

echo "➡️  Rechargement de Nginx..."
sudo systemctl reload nginx

echo "✅ Déploiement terminé !"
