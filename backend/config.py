import os 
from dotenv import load_dotenv

load_dotenv()

class Config():
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    MONGO_URI = os.getenv('MONGO_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')
    CORS_HEADERS = os.getenv('CORS_HEADERS')