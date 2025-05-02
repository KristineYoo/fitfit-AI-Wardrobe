# backend/services/image_service.py
# Refactored by Bao Vuong, 6:27PM 4/26/2025

import os
import base64
import mimetypes

from flask import current_app
from werkzeug.utils import secure_filename

# function to save an uploaded image to the backend image directory
# @param new_item: JSON file of the item with the image to be saved
# @return: the generated filename for the image that was saved
def save_image(new_item):
    # Extract the base64 image string
    image_data_url = new_item.get('image')
    
    # Split the base64 string to get the actual data after the prefix
    # Format is typically: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBD...
    header, encoded = image_data_url.split(',', 1)
    
    # Get the file extension from the MIME type (image/some extension)
    mime_type = header.split(';')[0].split(':')[1]
    file_ext = mime_type.split('/')[1]
    
    # Decode the base64 string (to binary)
    binary_data = base64.b64decode(encoded)
    
    # Create a unique filename
    filename = secure_filename(f"{new_item.get('name', 'untitled')}_{os.urandom(8).hex()}.{file_ext}")
    
    # Save the file
    upload_folder = current_app.config["IMAGE_UPLOAD_FOLDER"]
    file_path = os.path.join(upload_folder, filename)

    with open(file_path, 'wb') as f:
        f.write(binary_data)

    return filename


# Function to add a "imageData" field to the JSON, with an image encoding
# @param items: JSON of all loaded clothing items
# @return: None
def add_image_encodings(items):
    upload_folder = current_app.config["IMAGE_UPLOAD_FOLDER"]

    for item in items:
        # get image path
        filename = os.path.basename(item["image"])
        img_path = os.path.join(upload_folder,filename)

        # detect MIME type
        mime_type, _ = mimetypes.guess_type(img_path)
        # fallback if mime_type is not detected
        if mime_type is None:
            mime_type = "image/png"

        try:        
            # get file data
            file_data = None
            # Open and read the file in binary mode
            with open(img_path, 'rb') as file:
                file_data = file.read()
            # encode
            encoded_data = base64.b64encode(file_data)
            # make it a string to be used in JSON
            encoded_string = encoded_data.decode('utf-8')
            # Add encoded string as image data
            item["imageData"] = f"data:{mime_type};base64,{encoded_string}"
        except FileNotFoundError:
            item["imageData"] = None # Handle missing files

