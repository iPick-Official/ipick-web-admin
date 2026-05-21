#!/bin/bash
gcloud config set project ikomyut-frontend

gcloud auth application-default set-quota-project ikomyut-frontend

docker buildx build \
  --platform linux/amd64 \
  -t gcr.io/ikomyut-frontend/ipick-ui:prod \
  . --push

gcloud run deploy ipick-ui \
  --image gcr.io/ikomyut-frontend/ipick-ui:prod \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated\
  --timeout=900s \
   --set-env-vars="NEXT_PUBLIC_API_URL=https://mobapi.ipick.ph,NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC6v-zGYmYBrbltWjr6wNsiZ4yza4jij9k,NEXT_PUBLIC_GOOGLE_MAP_ID=4bc0535556f8db1a820cf5f5"
