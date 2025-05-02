# backend/app.py
# Refactored by Bao Vuong, 6:17PM 4/26/2025

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from models import db
from routes import register_blueprints

load_dotenv()

def create_app():
    app = Flask(__name__)

    from config import Config
    app.config.from_object(Config)
    
    db.init_app(app)
    CORS(app)

    register_blueprints(app)

    with app.app_context():
        db.create_all()

    return app
    
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    """Use this code to TEST the comparison function 
    (keyboard shortcut to uncomment is Ctrl+/ after selecting all lines)"""
    # # retireve prompt
    #prompt = "I'd like to wear something that is pink, cutesie and happy. I am going to work meeting formal"
    # # get similarities and store in a *list*
    #similarities = get_similarities(prompt)
    #print(similarities)