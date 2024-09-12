from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required
from bson import ObjectId
from . import job_bp
from .scraper import store_scraped_jobs

@job_bp.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    location = request.args.get('location')  # Get the location query parameter if present
    query = {}

    if location:
        query['location'] = {'$regex': location, '$options': 'i'}  # Case-insensitive search

    jobs = list(current_app.db.jobs.find(query))
    for job in jobs:
        job['_id'] = str(job['_id'])
    return jsonify(jobs)


@job_bp.route('/jobs/<job_id>', methods=['GET'])
@jwt_required()
def get_job(job_id):
    job = current_app.db.jobs.find_one({'_id': ObjectId(job_id)})
    if not job:
        return jsonify({'error': 'Job not found'}), 404

    job['_id'] = str(job['_id'])
    return jsonify(job)


@job_bp.route('/scrape_jobs', methods=['POST'])
@jwt_required()
def scrape_jobs():
    store_scraped_jobs()
    return jsonify({'message': 'Jobs scraped and stored successfully'}), 200