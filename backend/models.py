from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.sqlite import JSON

db = SQLAlchemy()

CHAR_LIMIT = 100

# subclass db.Model to define a database model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(CHAR_LIMIT), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    # back_populates owner so that we can access the user from a clothing item using 'clothing_item.owner'
    wardrobe_items = db.relationship('ClothingItem', back_populates='owner')
    past_outfits = db.Column(JSON, default=[])


class ClothingItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    name = db.Column(db.String(CHAR_LIMIT), nullable=False)
    note = db.Column(db.Text)

    category = db.Column(db.String(CHAR_LIMIT))
    color = db.Column(JSON, default=[])  # List of strings

    image = db.Column(db.String(255))

    # back_populates owner so that we can access the clothing items from a user using 'user.wardrobe_items'
    owner = db.relationship('User', back_populates='wardrobe_items')

    styling = db.Column(JSON, default={
        "tags": [],
        "season": [],
        "occasion": [],
        "mood": []
    })

    visibility = db.Column(db.String(20), default="shown")

    fabric = db.Column(JSON, default={
        "material": [],
        "thickness": None
    })

    embedding = db.Column(JSON, default=[])
    deleted = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'note': self.note,
            'category': self.category,
            'color': self.color,
            'image': self.image,
            'styling': self.styling,
            'visibility': self.visibility,
            'fabric': self.fabric,
            'embedding': self.embedding,
            'deleted': self.deleted
        }
    
    # Create an instance of ClothingItem instance from a dictionary
    # {'id': 1, 'user_id': 2,...} will get turned into ClothingItem(id=1, user_id=2,...)
    @classmethod
    def from_dict(cls, data):
        return cls(**data)


