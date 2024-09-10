from flask import jsonify, request, current_app, make_response
from email_validator import validate_email, EmailNotValidError
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity
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
    user = {
        '_id': email,
        'email': email,
        'password': hashed_password,
        'userName': userName,
        'phoneNumber': phoneNumber
    }
    current_app.db.users.insert_one(user)

    return jsonify({"user": user, 'status': 200})

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
        return jsonify({'error': 'Invalid password', 'status': 402})

    access_token = create_access_token(identity=str(user['_id']))

    response = make_response(jsonify({'user': user, 'status': 200}))
    set_access_cookies(response, access_token)  

    return response

@user_bp.route('/get_user')
def get_user():
    email = request.args.get('email')
    user = current_app.db.users.find_one({'email': email})

    if not user:
        return jsonify({'error': 'User doesn\'t exist', 'status': 400})

    user['_id'] = str(user['_id'])
    return jsonify({'user': user, 'status': 200})

@user_bp.route('/verify', methods=['GET'])
@jwt_required()  
def verify():
    user_id = get_jwt_identity() 
    user = current_app.db.users.find_one({'_id': user_id}, {'_id': 0}) 

    if user:
        return jsonify({'user': user, 'status': 200})
    else:
        return jsonify({'error': 'User not found', 'status': 404})



@user_bp.route('/logout', methods=['POST'])
@jwt_required() 
def logout():
    response = make_response(jsonify({'message': 'Logout successful', 'status': 200}))
    response.delete_cookie('access_token_cookie')
    return response
