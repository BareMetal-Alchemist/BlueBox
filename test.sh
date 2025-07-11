#!/bin/bash

curl -X POST http://localhost:5011/api/upload-pass \
  -H "Content-Type: application/json" \
  -d '{
        "machine": "WIN-SERVER1",
        "username": "Administrator",
        "new_password": "Secret123!",
        "changed_by": "Noah",
        "auth_token": "your_shared_secret_token"
      }'
