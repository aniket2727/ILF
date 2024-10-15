import bcrypt
from flask import Flask, request, jsonify

app = Flask(__name__)

# Function to hash passwords
def hash_password(password):
    if not password:
        return None, jsonify({"error": "Password is required."}), 400

    # Hash the password
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8'), None  # Return the hashed password and no error

@app.route('/hash-password', methods=['POST'])  # Define the endpoint for password hashing
def hash_password_route():
    # Get the password from the request body
    data = request.get_json()
    password = data.get('password')

    hashed_password, error = hash_password(password)  # Call the hash function

    if error:  # Check if there was an error
        return error  # Return error response if any
    return jsonify({"hashed_password": hashed_password}), 200  # Return the hashed password

if __name__ == '__main__':
    app.run(port=5000, debug=True)  # Run the app on port 5000
