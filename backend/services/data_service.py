# backend/services/data_service.py
# Created by Bao Vuong, 6:26PM 4/26/2025
# Mod by Sophia, 5/7/25
# Modified by Bao Vuong, 4:05PM 5/21/2025

from models import ClothingItem, Option, db
#from flask_sqlalchemy import or_

# Load clothing items that belong to a user.
# @param user_id: ID of the user
# @param include_deleted: If True, include soft-deleted items
# @return: List of ClothingItem objects
def load_user_clothing_items(user_id, include_deleted=False, search=None):
    query = ClothingItem.query.filter(ClothingItem.user_id==user_id)
    print("SEARCH THERM:",search)
    if search != None:
        print("refining query...")
        search_pattern = f"%{search}%"
        query = query.join(ClothingItem.options).filter(
            (
                ClothingItem.name.ilike(search_pattern) |
                ClothingItem.note.ilike(search_pattern) |
                (
                    (Option.type  == "category") & 
                    Option.label.ilike(search_pattern)
                )
            )
        )
    # if don't include soft-deleted items
    if not include_deleted:
        query = query.filter_by(deleted=False)
    return query.all()

# Function to serialize the item in SQLAlchemy object type to python dictionary
# @param items: one or multiple items of type SQLAlchemy object
# @return: serialized items of type dictionaries
def serialize_items(items):
    if isinstance(items, list):
        return [item.serialize() for item in items]
    else:
        return items.serialize()
    
# Function to validate the new item
# @param item: the new item to be added to the wardrobe data
# @return: True if the item is valid, False otherwise
def validate_item(item):
    required_fields = ["name", "note", "category", "color", "image", "styling", "visibility", "fabric"]
    for field in required_fields:
        if field not in item:
            return False
    return True

# Function to gather all the categories, tags, etc. into an "options" attribute
# @param item: the new item to be added to the wardrobe data
# @return: item with options attribute
def attach_options_to_item(item, data):
    option_labels = []

    def add(type_, values):
        if isinstance(values, list):
            for value in values:
                option_labels.append(type_, value)
        elif isinstance(values, str):
            option_labels.append(type_, values)
    
    add("category", data.get("category", [None]))
    add("color", data.get("color", []))

    styling = data.get("styling", {})
    add("material", styling.get("material", []))
    add("styleTag", styling.get("tags", []))
    add("moodTag", styling.get("mood", []))
    add("occasion", styling.get("occasion", []))
    add("season", styling.get("season", []))
    
    fabric = data.get("fabric", {})
    add("thickness", fabric.get("thickness", [None]))
    add("fabric", fabric.get("material", []))

    matched_options = Option.query.filter(
        db.or_(
            db.and_(Option.type == type_, Option.label == label)
            for type_, label in option_labels
        )
    ).all()

    item.options = matched_options

