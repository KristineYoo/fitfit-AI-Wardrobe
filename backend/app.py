from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app) # Allows Frontend to make requests to Backend

# define constant for the wardrobe data file
WARDROBE_DATA_FILE = "./public/assets/data/WardrobeData.json"

# Function to load the wardrobe data from the JSON file
# @return: the wardrobe data
def load_clothing_data():
    with open(WARDROBE_DATA_FILE) as f:
        return json.load(f)

# Function to validate the new item
# @param item: the new item to be added to the wardrobe data
# @return: True if the item is valid, False otherwise
def validate_item(item):
    required_fields = ["id", "name", "note", "category", "color", "image", "styling", "visibility", "fabric"]
    for field in required_fields:
        if field not in item:
            return False
    return True

# Function to generate a new id for a new item
# @param items: list of items in the wardrobe data
# @return: the new id for the new item
def generate_id(items):
    return items[-1]["id"] + 1

## Basic API endpoints

# GET /api/items: return all clothing items when request is made
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify({"items": load_clothing_data()})

# GET /api/items/<item_id>: return details of a specific clothing item when request is made
@app.route("/api/items/<int:item_id>", methods=["GET"])
def get_item(item_id):
    items = load_clothing_data()
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({"message": "Item not found"}), 404

# GET /api/recommend: return 3 random clothing items to form an outfit when request is made
@app.route("/api/recommend", methods=["GET"])
def recommend_outfit():
    # choose 3 random items from the wardrobe data
    items = load_clothing_data()
    random_items = random.sample(items, 3)
    return jsonify({"items": random_items})

# POST /api/add-item: add a new clothing item to the wardrobe data when request is made
@app.route("/api/add-item", methods=["POST"])
def add_item():
    new_item = request.get_json()
    items = load_clothing_data()

    # generate a new id for the item
    new_item["id"] = items[-1]["id"] + 1

    # validate the new item
    if not validate_item(new_item):
        return jsonify({"message": "Invalid item"}), 400
    
    # add the new item to the wardrobe data
    items.append(new_item)
    with open(WARDROBE_DATA_FILE, 'w') as f:
        json.dump(items, f, indent=4)
    return jsonify(new_item), 201

# PUT /api/update-item/<item_id>: update the details of a specific clothing item when request is made
@app.route("/api/update-item/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    updated_item = request.get_json()
    items = load_clothing_data()
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        # validate the updated item
        if not validate_item(updated_item):
            return jsonify({"message": "Invalid item"}), 400
        
        # update the item details
        item.update(updated_item)
        with open(WARDROBE_DATA_FILE, 'w') as f:
            json.dump(items, f, indent=4)
        return jsonify(item)
    return jsonify({"message": "Item not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
