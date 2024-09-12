from flask import Flask
from pymongo import MongoClient
import pymongo
from config import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    app.config.from_object(Config)
    app.config.from_pyfile('config.py', silent=True)
    
    client = MongoClient(app.config['MONGO_URI'])
    db = client.twiscord
    app.db = db
    app.db.users.create_index([("email", pymongo.ASCENDING)], unique=True)
    
    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = "shhhhh"
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']  


    app.config['JWT_COOKIE_SECURE'] = False 
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'  
    app.config['JWT_COOKIE_SAMESITE'] = 'None' 
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 24 * 3600  
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False  
    app.config['JWT_COOKIE_HTTPONLY'] = False

    from .blueprints.user import user_bp
    from .blueprints.job import job_bp
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(job_bp, url_prefix='/job')
    
    return app