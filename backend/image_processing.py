""" 
Author: Sophia Somers
Created: 4-21-25
Description: Helper functions to be used in app.py when saving images to the backend, sending images to the frontend, and removing backgrounds.
Code Updates and Attributions:
4-21-25 Code taken from "Rembg: Effortlessly Remove Backgrounds in Python" tutorial my Manoj Das from Medium for the remove_bg function
"""
from werkzeug.utils import secure_filename
import base64
import os
import rembg
import numpy as np
from PIL import Image

IMAGE_UPLOAD_FOLDER = './public/assets/data/images'

# function to save an uploaded image *in base64* to the backend image directory
# @param new_item: JSON file of the item with the image to be saved (in a base64 format)
# @return: the generated filename for the image that was saved
def save_image(new_item):
    # Extract the base64 image string
    image_data_url = new_item.get('image')
    
    if image_data_url and isinstance(image_data_url, str) and image_data_url.startswith('data:'):
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
        file_path = os.path.join(IMAGE_UPLOAD_FOLDER, filename)
        with open(file_path, 'wb') as f:
            f.write(binary_data)

        return filename
    
# Function to add a "imageData" field to the JSON, with an image encoding
# @param items: JSON of all loaded clothing items
# @return: None
def add_img_encodings(items):
    for item in items:
        # get image path
        filename = os.path.basename(item["image"])
        img_path = os.path.join("public","assets","data","images",filename)
        # detect MIME type
        mime_type, _ = mimetypes.guess_type(img_path)
        # fallback if mime_type is not detected
        if mime_type is None:
            mime_type = "image/png"
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

# Function to remove the background from an image file in the backend
# @param path: the name of the image file as a string
# @return: None
def remove_bg(path):
    # Code Attribution: Most of the below code was taken from the tutorial "Rembg: Effortlessly Remove Backgrounds in Python"
    # by Manoj Das on Medium

    # Load the input image
    input_image = Image.open(os.path.join("public","assets","data","images",path))
    # input_image = Image.open(f"./public/assets/data/images/default.png")

    # Convert the input image to a numpy array
    input_array = np.array(input_image)

    # Apply background removal using rembg
    output_array = rembg.remove(input_array)

    # Create a PIL Image from the output array
    output_image = Image.fromarray(output_array)

    # Sophia's Edit: as we are removing background, we must same as png to support transparency
    # Extract base filename
    base_filename = os.path.basename(path)
    # take off the extension
    base_filename = os.path.splitext(base_filename)[0]

    # Save the output image
    output_image.save(os.path.join(IMAGE_UPLOAD_FOLDER, f"{base_filename}.png"))

if __name__ == "__main__":
    remove_bg("Black_Dress.jpeg")