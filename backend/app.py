from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random
import filters
import os
from transformer import getEmbedding
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

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
    required_fields = ["name", "note", "category", "color", "image", "styling", "visibility", "fabric"]
    for field in required_fields:
        if field not in item:
            return False
    return True

# Function to generate a new id for a new item
# @param items: list of items in the wardrobe data
# @return: the new id for the new item
def generate_id(items):
    return items[-1]["id"] + 1

# Function to convert the item details to a string
# @param item: the item to be converted to a string
# @return: the string representation of the item
def stringify(item):
    result = "A "
    for color in item["color"]:
        result += color + " "
    for fabric in item["fabric"]["material"]:
        result += fabric + " "
    result += item["category"] + " with " + item["fabric"]["thickness"] + " thickness, "
    result += item["name"] + ","
    result += " suitable for "
    for season in item["styling"]["season"]:
        result += season + ", "
    result += "and "
    for occasion in item["styling"]["occasion"]:
        result += occasion + ". "
    result += "This item gives off a "
    for tag in item["styling"]["tags"]:
        result += tag + ", "
    result += "vibe. "
    result += "It can be worn especially when I'm "
    moods = item["styling"]["mood"]
    if len(moods) > 1:
        result += ", ".join(moods[:-1]) + " and " + moods[-1] + ". "
    elif moods:
        result += moods[0] + ". "
    result += "Note: " + item["note"]
    return result
    
# Function to compute cosine similarites between the prompt and item embeddings
# @param item: user prompt from frontend (string)
# @return: list of similarities (each floats between 0 and 1) for each item in order of id's
def get_similarities(prompt):
    # embed the prompt
    prompt_emb = getEmbedding(prompt)
    # compare embedding of prompt to each item and store in list
    similarities = {}
    items = load_clothing_data()
    for i in items:
        i_emb = np.array(i['embedding'])
        i_id = i['id']
        # compute cosine similarity (as a regular float)
        similarities[i_id] = float(cosine_similarity(i_emb.reshape(1, -1), prompt_emb.reshape(1, -1))[0][0])
    return similarities

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
@app.route("/api/recommend", methods=["GET", "POST"])
def recommend_outfit():
    # retireve prompt
    prompt = request.json()['prompt']
    # get similarities and store in a dictionary
    similarities = get_similarities(prompt)
    # choose 3 random items from the wardrobe data
    items = load_clothing_data() # array of objects
    # filter non-visible items
    filtered = filters.filter(items)
    # TODO: filter by weather
    random_items = random.sample(filtered, 3)
    return jsonify({"items": random_items})

# POST /api/add-item: add a new clothing item to the wardrobe data when request is made
@app.route("/api/add-item", methods=["POST"])
def add_item():
    new_item = request.get_json()
    if not validate_item(new_item):
        return jsonify({"message": "Invalid item"}), 400
    
    items = load_clothing_data()
    print(stringify(new_item))
    # get the embedding for the new_item and turn the ndarray of NumPy into a normal array so that we can
    # store it in the JSON file
    new_item["embedding"] = getEmbedding(stringify(new_item)).tolist()

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
    updated_item["embedding"] = getEmbedding(stringify(updated_item)).tolist()
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

@app.route("/api/delete-item/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    items = load_clothing_data()
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        #items.remove(item)
        item.update({"deleted": True})
        with open(WARDROBE_DATA_FILE, 'w') as f:
            json.dump(items, f, indent=4)
        return jsonify(item)
    return jsonify({"message": "Item not found"}), 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    """Use this code to TEST the comparison function 
    (keyboard shortcut to uncomment is Ctrl+/ after selecting all lines)"""
    # # retireve prompt
    # prompt = "I'd like to wear something that is pink, cutesie and happy. I am going to work meeting formal"
    # # get similarities and store in a *list*
    # similarities = get_similarities(prompt)
    # print(similarities)