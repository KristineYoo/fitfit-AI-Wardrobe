# backend/routes/auth_routes.py
# Refactored by Bao Vuong, 6:19PM 4/26/2025
from flask import Blueprint, request, session, jsonify
from models import User, db

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# POST /api/auth/register: register a new user
@auth_bp.route('/register', methods=["POST"])
def register_user():
    # get user data from API call
    user_data = request.get_json()

    username = user_data.get('username')
    password = user_data.get('password')

    # check to see if username exists
    existing_user = User.query.filter_by(username=username).first()

    if existing_user:
        return jsonify({"message": "Username already exists"}), 400 # return HTTP code 400: bad request from client
    
    # Create User with given username and password and saved to database
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": {"username": new_user.username, "user_id": new_user.id}}), 201 # return HTTP code 201: created successfully

# PUT /api/auth/login: login with user data
@auth_bp.route('/login', methods=["PUT"])
def login_user():
    # get user data from API call
    user_data = request.get_json()
    
    username = user_data.get("username")
    password = user_data.get("password")

    # Look for the user in the database
    user = User.query.filter_by(username=username, password=password).first()

    if user: # if user exists
        session["user"] = {"id": user.id, "username": user.username} # only save necessary data to session
        return jsonify({"message": "Successfully logged in"}), 200 # return HTTP code 200: OK
    else:
        return jsonify({"message": "Username and/or password doesn not exist"}), 401 # return HTTP code 401: unauthorized

# PUT /api/auth/logout: logout current user
@auth_bp.route('/logout', methods=["PUT"])
def logout_user():
    session["user"] = None # set user information in session to None
    return jsonify({"message": "Successfully logged out"}), 200 # return HTTP code 200: OK