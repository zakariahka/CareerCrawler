from flask import Flask, jsonify
from pymongo import MongoClient
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
client = MongoClient(app.config['MONGO_URI'])
app.db = client.twiscord

@app.route("/")
def signup():
    users = list(app.db.users.find({}, {'_id': 0}))  
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)