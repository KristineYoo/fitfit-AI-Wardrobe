# Created by Bao Vuong 10:08PM 5/28/2025

from flask import Blueprint, request, jsonify
from models import Option, db

option_bp = Blueprint('option', __name__, url_prefix='/api/option')

# GET /api/option: return options, filter via type sent to this endpoint
@option_bp.route("/", methods=["GET"])
def get_options():
    option_type = request.args.get('type')
    if option_type:
        options = Option.query.filter_by(type=option_type).all()
    else:
        options = Option.query.all()

    return jsonify([
        {"label": o.label, "value": o.value, "type": o.type}
        for o in options
    ])

# POST /api/option: create a new option
@option_bp.route("/", methods=["POST"])
def create_option():
    data = request.get_json()
    label = data.get('label')
    type_ = data.get('type')

    if not label or not type_:
        return jsonify({"error": "Label and type are required"}), 400
    
    existing_option = Option.query.filter_by(label=label.lower(), type=type_).first()
    if existing_option:
        return jsonify({"error": "Option with this label and type already exists"}), 200
    
    new_option = Option(label=label.lower(), value=label.lower(), type=type_)
    db.session.add(new_option)
    db.session.commit()

    return jsonify({"message": "Option created successfully"}), 201