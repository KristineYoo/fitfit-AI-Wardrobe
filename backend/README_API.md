# Wardrobe API Documentation

## Overview
Documentation for APIs, including retrieving, adding, updating, and recommending clothing items.

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Get All Clothing Items
**GET** `/items`

#### Response:
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

### Get a Specific Clothing Item
**GET** `/items/{item_id}`

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
    "image": "/img/pink_sweater.jpeg",
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
**GET** `/api/recommend`

#### Description:
Returns three randomly selected clothing items to form an outfit.

#### Response Example:
```json
{
    "items": [
        { "id": 1, "name": "Black T-Shirt" },
        { "id": 2, "name": "Denim Jeans" },
        { "id": 3, "name": "White Sneakers" }
    ]
}
```

### Add a Clothing Item
**POST** `/api/add-item`

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
    "image": "/img/Blue_Jacket.jpeg"
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
    "image": "/img/Blue_Jacket.jpeg"
}
```

#### Error Response:
```json
{
    "message": "Invalid item"
}
```

### Update a Clothing Item
**PUT** `/api/update-item/{item_id}`

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
**POST** `/api/register`

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

##
### How to parse the json array into Ndarray embedding
```
import numpy as np

a = np.array(jsonContent)
```
