#!/usr/bin/env bash
# ==============================================================================
# VIKAS GRAMMAR HIGH SCHOOL — FRONTEND WEB HOSTING DEPLOYMENT
# ==============================================================================
set -e

export PATH="/Users/devanboinatharun/.local/node/bin:$PATH"
PROJECT_ID="erp-schools-507610"

echo "=========================================================="
echo "🌐 DEPLOYING FRONTEND TO FIREBASE HOSTING / CLOUD CDN"
echo "=========================================================="

echo "🚀 Step 1: Deploying to Firebase Hosting ($PROJECT_ID)..."
npx -y firebase-tools deploy --only hosting --project "$PROJECT_ID"

echo "=========================================================="
echo "🎉 FRONTEND DEPLOYED LIVE TO THE INTERNET!"
echo "🔗 Live Web App: https://${PROJECT_ID}.web.app"
echo "=========================================================="
