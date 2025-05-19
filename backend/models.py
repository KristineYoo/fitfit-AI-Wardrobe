# Modified by Bao Vuong, 11:03PM 5/18/2025
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.sqlite import JSON

db = SQLAlchemy()

CHAR_LIMIT = 100

# subclass db.Model to define a database model
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(CHAR_LIMIT), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    # back_populates owner so that we can access the user from a clothing item using 'clothing_item.owner'
    wardrobe_items = db.relationship('ClothingItem', back_populates='owner')
    past_outfits = db.Column(JSON, default=[])


class Option(db.Model):
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(50), nullable=False)  # e.g., color, moodTag, styleTag, category
    label = db.Column(db.String(100), nullable=False)  # e.g., Red, Happy, Casual, T-shirt
    value = db.Column(db.String(100), nullable=True)   # e.g., #FF0000 for colors

    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'label': self.label,
            'value': self.value

        }

clothing_item_options = db.Table(
    'clothing_item_options',
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('clothing_item_id', db.Integer, db.ForeignKey('clothing_item.id')),
    db.Column('option_id', db.Integer, db.ForeignKey('options.id'))
)

class ClothingItem(db.Model):
    __tablename__ = 'clothing_item'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    name = db.Column(db.String(CHAR_LIMIT), nullable=False)
    note = db.Column(db.Text)
    image = db.Column(db.String(255))
    visibility = db.Column(db.String(20), default="shown")
    deleted = db.Column(db.Boolean, default=False)
    embedding = db.Column(JSON, default=[])

    # back_populates owner so that we can access the clothing items from a user using 'user.wardrobe_items'
    owner = db.relationship('User', back_populates='wardrobe_items')

    # Many-to-many relationship with options
    options = db.relationship('Option', secondary=clothing_item_options, backref='clothing_items')

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'note': self.note,
            'image': self.image,
            'visibility': self.visibility,
            'embedding': self.embedding,
            'deleted': self.deleted,
            'options': [option.serialize() for option in self.options]
        }
    
    # Create an instance of ClothingItem instance from a dictionary
    # {'id': 1, 'user_id': 2,...} will get turned into ClothingItem(id=1, user_id=2,...)
    @classmethod
    def from_dict(cls, data):
        return cls(**data)

