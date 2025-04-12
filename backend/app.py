from flask import Flask, jsonify, request, session
from flask_cors import CORS
import json
import random
import filters
import os
from transformer import getEmbedding
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app) # Allows Frontend to make requests to Backend

# define constant for the wardrobe data file
WARDROBE_DATA_FILE = "./public/assets/data/WardrobeData.json"
USER_DATA_FILE = "./public/assets/data/UserData.json"

# Function to load the wardrobe data from the JSON file
# @return: the wardrobe data
def load_clothing_data():
    with open(WARDROBE_DATA_FILE) as f:
        return json.load(f)
    
def load_relevant_clothing_data():
    with open(WARDROBE_DATA_FILE) as f:
        items=json.load(f)
    user=session.get("user", None)
    relevant=[]
    if user==None:
        return(jsonify({"message": "No user logged in"}), 404)
    for id in user["wardrobe_items"]:
        relevant.append(items[id-1])
    return relevant

def load_user_data():
    with open(USER_DATA_FILE) as f:
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
def get_similarities(prompt, filtered):
    # embed the prompt
    prompt_emb = getEmbedding(prompt)
    # compare embedding of prompt to each item and store in list
    similarities = {}
    items = filtered
    for i in items:
        i_emb = np.array(i['embedding'])
        i_id = i['id']
        # compute cosine similarity (as a regular float)
        similarities[i_id] = float(cosine_similarity(i_emb.reshape(1, -1), prompt_emb.reshape(1, -1))[0][0])
    return similarities

def configure_fit(items, similarities):
    # create ranked lists of tops, bottoms and shoes
    tops = []
    bottoms = []
    top_bottom = []
    footwear = []
    # sort similarities
    sorted_similarities = [(id, similarities[id]) for id in similarities]
    sorted_similarities = sorted(sorted_similarities, key=lambda item: item[1])[::-1]
    # iterate through most similar items, populate ranked lists
    for id, score in sorted_similarities:
        # find item with given id
        item = next((item for item in items if item["id"] == id), None)
        category = item['category']
        # add to appropriate list
        if category in ['sweater', 't-shirt']:
            tops.append((item, score))
        elif category in ['dress']:
            top_bottom.append((item, score))
        elif category in ['jeans']:
            bottoms.append((item, score))
        elif category in ['boots', 'sneakers']:
            footwear.append((item, score))

    # figure out top fits of each type
    # create fit object (fields: items, tags)
    fit_1_tags = list(set(tops[0][0]["styling"]["tags"]+
            bottoms[0][0]["styling"]["tags"]+
            footwear[0][0]["styling"]["tags"]))
    fit_1 = {
        "items":[
            tops[0][0],
            bottoms[0][0],
            footwear[0][0]
        ],
        "tags":fit_1_tags
    }
    # don't forget about tops made up of top_bottoms like dresses or onesies! (not used currently)
    fit_2_tags = list(set(top_bottom[0][0]["styling"]["tags"]+
            footwear[0][0]["styling"]["tags"]))
    fit_2 = {
        "items":[
            top_bottom[0][0],
            footwear[0][0]
        ],
        "tags":fit_2_tags
    }
    # return fit
    return [fit_1]

## Basic API endpoints

# GET /api/items: return all clothing items when request is made
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify({"items": load_clothing_data()})

@app.route("/api/relevantItems", methods=["GET"])
def get_relevantItems():
    user=session.get("user", None)
    if user!=None:
        return jsonify({"items": load_relevant_clothing_data()})
    return jsonify({"message": "No user logged in"}), 404

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
    prompt = request.get_json()['prompt']
    # get items from JSON
    items = load_relevant_clothing_data() # array of objects
    # filter non-visible items
    filtered = filters.filter(items)
    # get similarities and store in a dictionary
    similarities = get_similarities(prompt, filtered)
    # configure fits
    fits = configure_fit(filtered, similarities)
    return jsonify({"fits": fits})

# POST /api/add-item: add a new clothing item to the wardrobe data when request is made
@app.route("/api/add-item", methods=["POST"])
def add_item():
    new_item = request.get_json()
    if not validate_item(new_item):
        return jsonify({"message": "Invalid item"}), 400
    
    items = load_clothing_data()
    users=load_user_data()
    user = session.get("user")
    print(stringify(new_item))
    # get the embedding for the new_item and turn the ndarray of NumPy into a normal array so that we can
    # store it in the JSON file
    new_item["embedding"] = getEmbedding(stringify(new_item)).tolist()

    # generate a new id for the item
    id = items[-1]["id"] + 1
    new_item["id"] = id
    user["wardrobe_items"].append(id)
    users[user["id"]-1]=user
    session["user"]=user
    # add the new item to the wardrobe data
    items.append(new_item)
    with open(WARDROBE_DATA_FILE, 'w') as f:
        json.dump(items, f, indent=4)
    with open(USER_DATA_FILE, 'w') as f:
        json.dump(users, f, indent=4)
    return jsonify(new_item), 201

# PUT /api/update-item/<item_id>: update the details of a specific clothing item when request is made
@app.route("/api/update-item/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    updated_item = request.get_json()
    updated_item["embedding"] = getEmbedding(stringify(updated_item)).tolist()
    items = load_relevant_clothing_data()
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

# DELETE /api/delete-item/<int:item_id>: marks item as deleted 
@app.route("/api/delete-item/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    items = load_relevant_clothing_data()
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        #items.remove(item)
        item.update({"deleted": True})
        with open(WARDROBE_DATA_FILE, 'w') as f:
            json.dump(items, f, indent=4)
        return jsonify(item)
    return jsonify({"message": "Item not found"}), 404


# POST /api/post-prompt: takes the prompt from the text field
@app.route("/api/post-prompt", methods=["POST"])
def get_prompt():
    data=request.get_json()
    prompt=data.get('text')
    return(prompt)

# POST /api/register: register a new user
@app.route("/api/register", methods=["POST"])
def register_user():
    user_data = request.get_json()
    username = user_data.get("username")
    # password should be hashed in frontend (not here)
    password = user_data.get("password")

    # Check if user exists
    users = load_user_data()
    for user in users:
        if user["username"] == username:
            return jsonify({"message": "User already exists"}), 400
    
    # Create a new user
    new_user = {
        "id": users[-1]["id"] + 1 if users else 1,
        "username": username,
        "password": password,
        "wardrobe_items": [],
        "pastOutfits": []
    }

    # Add the new user to the user data
    users.append(new_user)
    with open(USER_DATA_FILE, 'w') as f:
        json.dump(users, f, indent=4)

    return jsonify({"message": "User registered successfully", "user": new_user}), 201

@app.route("/api/login", methods=["PUT"])
def login_user():
    user_data = request.get_json()
    users = load_user_data()
    for user in users:
        if ((user["username"]==user_data.get("username")) and user["password"]==user_data.get("password")):
            session["user"]=user
            return jsonify({"message": "Successfully logged in"})
    else:
        return jsonify({"message": "User name and or password does not exist"})

@app.route("/api/logout", methods=["PUT"])
def logout_user():
    session["user"]=None
    return jsonify({"message": "Successfully logged out"})
    
         
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    """Use this code to TEST the comparison function 
    (keyboard shortcut to uncomment is Ctrl+/ after selecting all lines)"""
    # # retireve prompt
    #prompt = "I'd like to wear something that is pink, cutesie and happy. I am going to work meeting formal"
    # # get similarities and store in a *list*
    #similarities = get_similarities(prompt)
    #print(similarities)