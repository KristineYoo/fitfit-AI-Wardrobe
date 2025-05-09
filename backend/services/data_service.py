# backend/services/data_service.py
# Created by Bao Vuong, 6:26PM 4/26/2025
# Mod by Sophia, 5/7/25

from models import ClothingItem
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
        query = query.filter(
            (
                ClothingItem.name.ilike(search_pattern) |
                ClothingItem.category.ilike(search_pattern) |
                ClothingItem.note.ilike(search_pattern)
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