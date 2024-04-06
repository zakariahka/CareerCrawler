from flask import Blueprint, jsonify, current_app, request
import re

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/')
def index():
    users = list(current_app.db.users.find({}, {'_id': 0}))  
    return jsonify(users)

@user_bp.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return jsonify({'error': 'Invalid email or password is missing'}), 400
    
    valid_email = re.match(r"^\S+@\S+\.\S+$", email)

    if not valid_email:
        return jsonify({'error': 'Invalid email format'}), 400
    
    exists = current_app.users.find_one({"email": email})

    if exists:
        return jsonify({"error": "The user already exists"}), 400
    
    return jsonify({'message': 'Signup successful'}), 200
