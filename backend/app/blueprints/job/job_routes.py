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

