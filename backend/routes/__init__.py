# backend/routes/__init__.py
# Created by Bao Vuong, 6:23PM 4/26/2025
# Modified by Bao Vuong, 10:53PM 5/28/2025

from .auth_routes import auth_bp
from .item_routes import item_bp
from .recommend_routes import recommend_bp
from .option_routes import option_bp
# Constant list of all blueprints
ALL_BLUEPRINTS = [auth_bp, item_bp, recommend_bp, option_bp]

def register_blueprints(app):
    for bp in ALL_BLUEPRINTS:
        # Register all the blueprints so they work in app
        app.register_blueprint(bp)