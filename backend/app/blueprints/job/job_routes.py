from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required
from bson import ObjectId

job_bp = Blueprint('job', __name__)

@job_bp.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    jobs = list(current_app.db.jobs.find())
    for job in jobs:
        job['_id'] = str(job['_id'])
    return jsonify(jobs)

@job_bp.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    job = {
        'title': data.get('title'),
        'company': data.get('company'),
        'location': data.get('location'),
        'description': data.get('description'),
        'link': data.get('link')
    }

    result = current_app.db.jobs.insert_one(job)
    job['_id'] = str(result.inserted_id) 

    return jsonify(job), 201