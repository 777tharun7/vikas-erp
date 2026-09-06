#!/usr/bin/env bash
# ==============================================================================
# VIKAS GRAMMAR HIGH SCHOOL ERP — GOOGLE CLOUD ONE-CLICK DEPLOYMENT SCRIPT
# ==============================================================================
set -e

PROJECT_ID="erp-schools-507610"
REGION="asia-south1"
INSTANCE_CONNECTION="erp-schools-507610:asia-south1:school-erp-db"
DB_NAME="school_erp"
DB_USER="postgres"
DB_PASS="school-erp-db-T#@&un7995870172"
ENCODED_PASS="school-erp-db-T%23%40%26un7995870172"
SERVICE_NAME="vikas-erp-backend"

echo "=========================================================="
echo "🚀 DEPLOYING VIKAS ERP BACKEND TO GOOGLE CLOUD RUN"
echo "=========================================================="

echo "📦 Step 1: Setting Active GCP Project..."
gcloud config set project "$PROJECT_ID"

echo "🏗️ Step 2: Deploying FastAPI Backend from backend/ directory..."
gcloud run deploy "$SERVICE_NAME" \
  --source ./backend \
  --region "$REGION" \
  --add-cloudsql-instances "$INSTANCE_CONNECTION" \
  --set-env-vars DATABASE_URL="postgresql://${DB_USER}:${ENCODED_PASS}@34.47.237.51:5432/${DB_NAME}" \
  --set-env-vars SECRET_KEY="edupulse_prod_jwt_secret_telangana_2026_cloud_run" \
  --set-env-vars DEFAULT_SCHOOL_SLUG="vikas-cherial" \
  --allow-unauthenticated \
  --quiet

echo "📡 Step 3: Fetching Live Cloud Run Service URL..."
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format="value(status.url)")

echo "=========================================================="
echo "🎉 BACKEND DEPLOYED SUCCESSFULLY!"
echo "🔗 Live API URL: ${SERVICE_URL}/api/v1"
echo "📚 Live Swagger Docs: ${SERVICE_URL}/docs"
echo "=========================================================="
