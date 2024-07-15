from flask import Blueprint, jsonify, request, current_app
from email_validator import validate_email, EmailNotValidError
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from . import user_bp


@user_bp.route('/')
def index():
    users = list(current_app.db.users.find({}, {'_id': 0}))
    return jsonify(users)

@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body must be JSON', 'status': 400})

    email = data.get('email')
    password = data.get('password')
    userName = data.get('userName')
    phoneNumber = data.get('phoneNumber')

    if email is None or password is None:
        return jsonify({'error': 'Email or password is missing', 'status': 401})

    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as e:
        return jsonify({'error': str(e), 'status': 402})

    exists = current_app.db.users.find_one({"email": email})
    if exists:
        return jsonify({'error': 'User already exists', 'status': 400})

    hashed_password = generate_password_hash(password)
    user = {'_id': email, 'email': email, 'password': hashed_password,
            'userName': userName, 'phoneNumber': phoneNumber}
    inserted_user = current_app.db.users.insert_one(user)

    access_token = create_access_token(identity=str(inserted_user.inserted_id))
    return jsonify({"user": user, "token": access_token, 'status': 200})

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body must be in JSON', 'status': 400})

    email = data.get("email")
    password = data.get('password')

    if email is None or password is None:
        return jsonify({'error': 'Email or password is missing', 'status': 401})

    user = current_app.db.users.find_one({'email': email})
    if not user:
        return jsonify({'error': 'A user with that email doesn\'t exist', 'status': 402})
    
    if not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid password'}), 403
    
    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({'user': user, 'token': access_token, 'status': 200})

@user_bp.route('/get_user')
def get_user():
    email = request.args.get('email')
    user = current_app.db.users.find_one({'email': email})

    if not user:
        return jsonify({'error': 'User doesnt exist', 'status': 400})
    
    user['_id'] = str(user['_id'])
    return jsonify(user)