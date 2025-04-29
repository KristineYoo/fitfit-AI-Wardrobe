# backend/routes/item_routes.py
# Refactored by Bao Vuong, 6:23PM 4/26/2025

from flask import Blueprint, request, jsonify, session
from models import ClothingItem, db
from .auth_helpers import login_required, get_current_user_id
from services.image_service import add_image_encodings, save_image
from services.data_service import serialize_items, validate_item, load_user_clothing_items
from services.embedding_service import get_embedding, stringify

item_bp = Blueprint('item', __name__, url_prefix='/api/item')


# GET /api/item/: return all clothing items of current user when request is made
@item_bp.route('/', methods=["GET"])
@login_required
def get_items():
    current_user_id = get_current_user_id()

    items = load_user_clothing_items(current_user_id)
    
    # serialize SQLAlchemy object into dictionary
    serialized_items = serialize_items(items)

    # adding imgData
    add_image_encodings(serialized_items)

    return jsonify({"items": serialized_items}), 200 # return HTTP code 200: OK


# GET /api/item/<item_id>: return details of a specific clothing item when request is made
@item_bp.route('/<int:item_id>', methods=["GET"])
@login_required
def get_item(item_id):
    item = ClothingItem.query.get(item_id)
    
    # serialize SQLAlchemy object into dictionary
    serialized_item = serialize_items(item)

    if serialized_item:
        add_image_encodings(serialized_item)
        return jsonify(serialized_item), 200 # return HTTP code 200: OK
    return jsonify({"message": "Item not found"}), 404 # return HTTP code 404: Not Found


# POST /api/item/add-item: add a new clothing item to the wardrobe data when request is made
@item_bp.route("/add-item", methods=["POST"])
@login_required
def add_item():
    new_item_data = request.get_json()

    # check if item is valid
    if not validate_item(new_item_data):
        return jsonify({"message": "Invalid item"}), 400 # return HTTP code 400: bad request
    
    # get the embedding for the new_item and turn the ndarray of NumPy into a normal array so that we can
    # store it in the JSON file
    new_item_data["embedding"] = get_embedding(stringify(new_item_data)).tolist()
    new_item_data["user_id"] = get_current_user_id()
    # Dealing with the image upload
    try:
        filename = save_image(new_item_data)
    except:
        filename = "default.png"
    # Update the item data with the file path instead of the base64 string
    new_item_data['image'] = filename

    # add the new item to clothing item table
    new_item = ClothingItem.from_dict(new_item_data)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item_data), 201


# PUT /api/item/update-item/<item_id>: update the details of a specific clothing item when request is made
@item_bp.route("/update-item/<int:item_id>", methods=["PUT"])
@login_required
def update_item(item_id):
    updated_item = request.get_json()
    updated_item["embedding"] = get_embedding(stringify(updated_item)).tolist()
    item = ClothingItem.query.get(item_id)

    if not item:
        return jsonify({"message": "Item not found"}), 404
    
    if item.user_id != get_current_user_id():
        return jsonify({"message": "Unauthorized access"}), 403
    
    # update fields
    for field in ["name", "note", "category", "color", "styling", "visibility", "fabric", "embedding", "image"]:
        if field in updated_item:
            setattr(item, field, updated_item[field])

    db.session.commit()

    return jsonify(item.serialize()), 200


# DELETE /api/item/delete-item/<int:item_id>: marks item as deleted 
@item_bp.route("/delete-item/<int:item_id>", methods=["DELETE"])
@login_required
def delete_item(item_id):
    item = ClothingItem.query.get(item_id)

    if not item:
        return jsonify({"message": "Item not found"}), 404
    
    if item.user_id != get_current_user_id():
        return jsonify({"message": "Unauthorized access"}), 403
    
    item.deleted = True

    db.session.commit()

    return jsonify({"message": "Item marked as deleted"}), 200