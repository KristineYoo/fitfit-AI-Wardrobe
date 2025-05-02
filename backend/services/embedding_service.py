# backend/services/embedding_service.py
# Refactored by Bao Vuong, 6:26PM 4/26/2025

from transformer import getEmbedding

def get_embedding(text):
    return getEmbedding(text)

# Function to convert the item details to a string
# @param item: the item to be converted to a string
# @return: the string representation of the item
def stringify(item):
    parts = []

    # colors and fabrics
    colors = " ".join(item.get("color", []))
    fabrics = " ".join(item.get("fabric", {}).get("material", []))
    thickness = item.get("fabric", {}).get("thickness", "medium")
    category = item.get("category", "item")
    name = item.get("name", "Unnamed")

    parts.append(f"A {colors} {fabrics} {category} with {thickness} thickness, {name},")

    # Seasons and occasions
    seasons = item.get("styling", {}).get("season", [])
    occasions = item.get("styling", {}).get("occasion", [])
    
    if seasons and occasions:
        parts.append(f"suitable for {', '.join(seasons)}, and {', '.join(occasions)}.")
    elif seasons:
        parts.append(f"suitable for {', '.join(seasons)}.")
    elif occasions:
        parts.append(f"suitable for {', '.join(occasions)}.")

    # Tags
    tags = item.get("styling", {}).get("tags", [])
    if tags:
        parts.append(f"This item gives off a {', '.join(tags)} vibe.")
    
    # Moods
    moods = item.get("styling", {}).get("mood", [])
    if moods:
        if len(moods) > 1:
            parts.append(f"It can be worn especially when I'm {', '.join(moods[:-1])} and {moods[-1]}.")
        else:
            parts.append(f"It can be worn especially when I'm {moods[0]}.")

    # Note
    note = item.get("note", "")
    if note:
        parts.append(f"Note: {note}")
    
    return " ".join(parts)