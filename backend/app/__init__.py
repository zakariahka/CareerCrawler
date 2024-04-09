from flask import Flask
from pymongo import MongoClient
import pymongo
from config import Config
from flask_jwt_extended import JWTManager
from .routes.user_routes import user_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)
    client = MongoClient(app.config['MONGO_URI'])
    db = client.twiscord
    app.db = db
    app.db.users.create_index([("email", pymongo.ASCENDING)], unique=True)

    jwt = JWTManager(app)
    app.register_blueprint(user_bp)

    return app
