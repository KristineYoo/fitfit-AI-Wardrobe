# backend/routes/recommend_routes.py
# Refactored by Bao Vuong, 6:23PM 4/26/2025
# Mod by Sophia Somers, 5/27/25

import filters
from flask import Blueprint, request, jsonify
from routes.auth_helpers import login_required, get_current_user_id
from services.data_service import load_user_clothing_items, serialize_items
from services.image_service import add_image_encodings
from services.recommend_service import get_similarities, configure_fit

recommend_bp = Blueprint('recommend', __name__, url_prefix='/api/recommend')

# GET /api/recommend: return k=3 best fits when request is made
@recommend_bp.route("/", methods=["GET", "POST"])
@login_required
def recommend_outfit():
    # retrieve prompt
    prompt = request.get_json()['prompt']
    
    # get items from database
    current_user_id = get_current_user_id()
    items = load_user_clothing_items(current_user_id)
    items = serialize_items(items)

    # filter non-visible items
    filtered = filters.filter(items)
    # configure fits
    fits = configure_fit(filtered, prompt)
    # add image data
    for i, fit in enumerate(fits):
        items = fits[i]["items"]
        add_image_encodings(items)
        fits[i]["items"] = items
    return jsonify({"fits": fits})