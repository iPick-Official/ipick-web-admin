#!/bin/bash

gcloud config set project ipick-admin

gcloud auth application-default set-quota-project ipick-admin

docker buildx build --platform linux/amd64 -t gcr.io/ipick-admin/ipick-web-admin:latest . --push

# Deploy from the pushed image (same project)
gcloud run deploy ipick-web-admin \
  --image gcr.io/ipick-admin/ipick-web-admin:latest \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --timeout=300s \
  --set-env-vars="NEXT_PUBLIC_API_URL=https://ipick-server-app-667662506856.asia-southeast1.run.app,NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC6v-zGYmYBrbltWjr6wNsiZ4yza4jij9k,NEXT_PUBLIC_GOOGLE_MAP_ID=4bc0535556f8db1a820cf5f5"
