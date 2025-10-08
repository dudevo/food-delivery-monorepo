#!/bin/bash
# Customer Registration Test
# Usage: ./02-register-customer.sh

BASE_URL="http://localhost:5001/api/auth"

echo "👤 Testing Customer Registration..."

# Customer registration data
customer_data='{
  "email": "customer.test@example.com",
  "password": "Customer@123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}'

echo "Registering customer with data:"
echo "$customer_data"
echo ""

response=$(http --ignore-stdin POST "$BASE_URL/register/customer" \
  "Content-Type: application/json" \
  <<< "$customer_data")

echo "$response"

# Check if registration was successful
if [[ $response == *"registered successfully"* ]]; then
    echo "✅ Customer registration successful!"
    
    # Extract user ID for subsequent tests
    user_id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "📝 User ID: $user_id"
    
    # Save to temporary file for other tests
    echo "CUSTOMER_ID=$user_id" > /tmp/customer_test_data
else
    echo "❌ Customer registration failed"
    exit 1
fi

echo ""