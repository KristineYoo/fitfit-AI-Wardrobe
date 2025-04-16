from app import app
from models import db, User, ClothingItem
import json
from transformer import getEmbedding
from werkzeug.security import generate_password_hash
import os

# Function to convert the item details to a string (copied from app.py)
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

def seed_database():
    with app.app_context():
        print("Clearing existing data...")
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create sample users
        print("Creating sample users...")
        user1 = User(
            username="testuser",
            password=generate_password_hash("password123")
        )
        user2 = User(
            username="fashionista",
            password=generate_password_hash("style456")
        )
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        
        wardrobe_path = "./public/assets/data/WardrobeData.json"
        if os.path.exists(wardrobe_path):
            print(f"Loading data from {wardrobe_path}...")
            with open(wardrobe_path) as f:
                items_data = json.load(f)
            
            for item_data in items_data:
                # Skip items marked as deleted
                if item_data.get("deleted", False):
                    continue
                    
                # Get embedding if it doesn't exist
                if "embedding" not in item_data:
                    print(f"Generating embedding for {item_data['name']}...")
                    item_text = stringify(item_data)
                    item_data["embedding"] = getEmbedding(item_text).tolist()
                
                # Create ClothingItem from dictionary
                clothing_item = ClothingItem.from_dict(item_data)
                
                # Assign to first user
                clothing_item.user_id = user1.id
                
                db.session.add(clothing_item)
            
            db.session.commit()
            print(f"Imported items successfully")
        else:
            print(f"Warning: {wardrobe_path} not found. No items were imported.")
            
            # Create some sample items manually
            print("Creating sample items...")
            item1 = ClothingItem(
                name="Blue Jeans",
                note="My favorite pair",
                category="jeans",
                color=["blue"],
                image="/img/blue_jeans.jpeg",
                user_id=user1.id,
                styling={
                    "tags": ["casual", "everyday"],
                    "season": ["all-season"],
                    "occasion": ["casual"],
                    "mood": ["relaxed"]
                },
                fabric={
                    "material": ["denim"],
                    "thickness": "medium"
                },
                visibility="shown"
            )
            
            item2 = ClothingItem(
                name="White T-Shirt",
                note="Basic tee",
                category="t-shirt",
                color=["white"],
                image="/img/white_tshirt.jpeg",
                user_id=user1.id,
                styling={
                    "tags": ["casual", "basic"],
                    "season": ["summer"],
                    "occasion": ["casual"],
                    "mood": ["relaxed"]
                },
                fabric={
                    "material": ["cotton"],
                    "thickness": "light"
                },
                visibility="shown"
            )
            
            # Generate embeddings for the items
            item1_text = stringify(item1.__dict__)
            item2_text = stringify(item2.__dict__)
            item1.embedding = getEmbedding(item1_text).tolist()
            item2.embedding = getEmbedding(item2_text).tolist()
            
            db.session.add(item1)
            db.session.add(item2)
            db.session.commit()
            
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()