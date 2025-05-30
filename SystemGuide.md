# Project Setup

1. **Change working directory to backend**

Run this command if your working directory is .../fitfit:
```
cd backend
```

Run this command if you working directory is .../fitfit/frontend
```
cd ../backend
```
2. **Run the backend server**
```
python app.py
```
The server should now be running at `http://127.0.0.1:5000/`.

3. **Open a new terminal and change your working directory to frontend**
Run this command if your working directory is .../fitfit:
```
cd frontend
```

Run this command if you working directory is .../fitfit/backend
```
cd ../frontend
```

4. **Run the backend server**
```
npm run dev
```
Then open the link this command provides to open the website




# Wardrobe API Documentation

## Overview
Documentation for APIs, including retrieving, adding, updating, and recommending clothing items.

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Get a Specific Clothing Item
**GET** `/api/item/{item_id}`

#### Request:
```
GET /items/1
```

#### Response:
```json
{
    "id": 1,
    "name": "Pink Sweater",
    "category": "sweater",
    "brand": "Zara",
    "size": "M",
    "color": "pink",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBD...",
    "styling": { ... },
    "purchaseInfo": { ... },
    "status": { ... },
    "fabric": { ... }
}
```

#### Error Response:
```json
{
    "message": "Item not found"
}
```

### Recommend Outfit
**GET** `/api/recommend/`

#### Description:
Returns three randomly selected clothing items to form an outfit.

#### Response Example:
```json
{
    "items": [
        { "id": 1, "name": "Black T-Shirt" ...},
        { "id": 2, "name": "Denim Jeans" ...},
        { "id": 3, "name": "White Sneakers" ...}
    ],
    "tags": [
        "cute",
        "casual"
    ]
}
```

### Add a Clothing Item
**POST** `/api/item/add-item`

#### Description:
Adds a new clothing item to the wardrobe.

#### Request Body Example:
```json
{
    "id": 7,
    "name": "Blue Jacket",
    "category": "jackets",
    "brand": "Nike",
    "size": "L",
    "color": "blue",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBD..."
}
```

#### Response Example:
```json
{
    "id": 7,
    "name": "Blue Jacket",
    "category": "jackets",
    "brand": "Nike",
    "size": "L",
    "color": "blue",
    "image": "9f553c0630fd6dec.jpeg",
    "user_id":2,
    "embedding":[-0.03667972609400749,...]
}
```

#### Error Response:
```json
{
    "message": "Invalid item"
}
```
or
```json
{
    "message": "No user logged in"
}
```

### Delete a Clothing Item
**POST** `/api/item/delete-item/{item_id}`

#### Description:
Deletes a clothing item from the wardrobe.

#### Request:
```
Delete /item/delete-item/1
```

#### Response Example:
```json
{
    "message": "Item marked as deleted"
}
```

#### Error Response:
```json
{
    "message": "Item not found"
}
```
or
```json
{
    "message": "Unauthorized access"
}
```

### Update a Clothing Item
**PUT** `/api/item/update-item/{item_id}`

#### Description:
Updates the details of a specific clothing item.

#### Request Body Example:
```json
{
    "name": "Updated Sneakers",
    "category": "sneakers",
    "brand": "Adidas",
    "size": "M",
    "color": "black",
    "image": "/img/Black_Sneakers.jpeg"
}
```

#### Response Example:
```json
{
    "id": 6,
    "name": "Updated Sneakers",
    "category": "sneakers",
    "brand": "Adidas",
    "size": "M",
    "color": "black",
    "image": "/img/Black_Sneakers.jpeg"
}
```

### Register a User
**POST** `/api/auth/register`

#### Description:
Check if user exists in the database, if not, create a new user in the database

#### Request Body Example:
```json
{
  "username": "testuser123",
  "password": "123456"
}
```

#### Response Example:
```json
{
    "message": "User registered successfully",
    "user": {
        "id": 2,
        "password": "123456",
        "pastOutfits": [],
        "username": "testuser123",
        "wardrobe_items": []
    }
}
```

#### Error Response:
```json
{
    "message": "User already exists"
}
```


### Login a user
**PUT** `/api/auth/login`

### Descriptions:
Check to see if a username and password exsits and if they do sets that user as the active user

#### Request Body Example:
```json
{
  "username": "testuser123",
  "password": "123456"
}


```

#### Response Example:
```json

{
    "message": "Successfully logged in"
}

```

#### Error Response:
```json
{
    "message": "User name and or password does not exist"
}
```

### Logout a user
**PUT** `/api/auth/logout`

### Descriptions:
Logs out the active user


#### Response Example:
```json

{
    "message": "Successfully logged out"
}

```

### Gets the items of the user
**GET** `/api/item/`

### Descriptions:
Returns the items registered to the active user


#### Response Example:
```json
{
    "items": [
        {
            "id": 1,
            "name": "Pink Sweater",
            "category": "sweater",
            "brand": "Zara",
            "size": "M",
            "color": "pink",
            "image": "/img/pink_sweater.jpeg",
            "styling": { ... },
            "purchaseInfo": { ... },
            "status": { ... },
            "fabric": { ... }
        }
    ]
}
```


##
### How to parse the json array into Ndarray embedding
```
import numpy as np

a = np.array(jsonContent)
```
