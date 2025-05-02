# backend/routes/auth_helpers.py
# Refactored by Bao Vuong, 6:18PM 4/26/2025
from functools import wraps
from flask import session, jsonify

# decorator to check auth before the function runs
# https://stackoverflow.com/questions/308999/what-does-functools-wraps-do
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"message": "Login required"}), 401
        return f(*args, **kwargs)
    return decorated_function

# return the user in the current session
def get_current_user():
    return session.get("user")

# return user_id of user in the current session
def get_current_user_id():
    current_user = get_current_user()
    if current_user:
        return current_user.get("id")
    return None