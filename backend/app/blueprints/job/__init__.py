from flask import Blueprint

job_bp = Blueprint('job_bp', __name__)

from . import job_routes