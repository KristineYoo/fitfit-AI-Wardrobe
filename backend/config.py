# backend/config.py
# Refactored by Bao Vuong, 6:17PM 4/26/2025
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///wardrobe.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Path constants
    IMAGE_UPLOAD_FOLDER = './public/assets/data/images'