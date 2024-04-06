from flask import Flask, current_app
from pymongo import MongoClient
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    client = MongoClient(app.config['MONGO_URI'])
    app.db = client.twiscord
    app.users = app.db.users


    with app.app_context():
        current_app.db = app.db
        
    from .routes.user_routes import user_bp
    app.register_blueprint(user_bp)
    return app
