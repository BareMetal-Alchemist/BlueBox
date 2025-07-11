import requests
import json
import random
import string

# 🔧 CONFIG
API_URL = "http://localhost:5011/api/upload-pass"
API_TOKEN = "your_shared_secret_token"  # ← replace with your real token

# 🔐 Generate a random password
def generate_password(length=16):
    chars = string.ascii_letters + string.digits + "!@#$%^&*()_+"
    return ''.join(random.choice(chars) for _ in range(length))

# 📦 Build payload
payload = {
    "machine": "DUMMY-WINDOWS01",
    "username": "adminuser",
    "new_password": generate_password(),
    "changed_by": "python_script",
    "auth_token": API_TOKEN
}

# 🌐 Send POST request
headers = {"Content-Type": "application/json"}
response = requests.post(API_URL, data=json.dumps(payload), headers=headers)

# 🧾 Print result
print("Status Code:", response.status_code)
print("Response:", response.text)

