
# password_service.py

# import bcrypt
# from flask import jsonify

# def hash_password(password):
#     if not password:
#         return jsonify({"error": "Password is required."}), 400

#     # Hash the password
#     hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#     return hashed.decode('utf-8')
