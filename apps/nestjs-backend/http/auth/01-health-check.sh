#!/bin/bash
# Health Check - Test if server is running
# Usage: ./01-health-check.sh

BASE_URL="http://localhost:5001/api"

echo "🏥 Testing API Health Check..."
echo "URL: $BASE_URL/health"

response=$(http --ignore-stdin GET "$BASE_URL/health")

echo "$response"

if [[ $response == *"ok"* ]]; then
    echo "✅ Health check passed - API is running!"
else
    echo "❌ Health check failed - API may not be running"
    echo "Please start the server with: pnpm dev"
    exit 1
fi

echo ""