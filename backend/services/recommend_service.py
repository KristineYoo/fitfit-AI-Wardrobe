# backend/services/recommend_service.py
# Refactored by Bao Vuong, 6:27PM 4/26/2025

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from .embedding_service import get_embedding

LAYERS_THRESHOLD = .5
ACCESSORIES_THRESHOLD = .5
PROMPT_WEIGHT = 1

# Function to compute cosine similarites between the prompt and item embeddings
# @param item: embedded user prompt from frontend
# @return: dictionary of similarities {item id: float between 0 and 1}
def get_similarities(prompt_emb, filtered):
    # compare embedding of prompt to each item and store in dict
    similarities = {}
    for i in filtered:
        i_emb = np.array(i['embedding'])
        i_id = i['id']
        # compute cosine similarity (as a regular float)
        similarities[i_id] = float(cosine_similarity(i_emb.reshape(1, -1), prompt_emb.reshape(1, -1))[0][0])
    return similarities

# Function to generate a recommended fit
# @param items: list of item objects
#        similarites: dictionary of similarites {item id: float between 0 and 1}
#        prompt: prompt string
# @return: list of fit objects
def configure_fit(items, prompt, k=3):
    # create ranked lists of each clothing category
    tops = []
    bottoms = []
    onepiece = []
    footwear = []
    accessories = []
    layers = []

    # Sort similarities:
    prompt_emb = get_embedding(prompt)
    # get similarities and store in a dictionary
    similarities = get_similarities(prompt_emb, items)
    # create a list of tuples (item id, similarity score to prompt)
    sorted_similarities = [(id, similarities[id]) for id in similarities]
    # sort most similar to least similar
    sorted_similarities = sorted(sorted_similarities, key=lambda item: item[1], reverse=True)
    
    # iterate through most similar items, populate ranked lists
    for id, score in sorted_similarities:
        # find item with given id
        item = get_item_from_id(items, id)
        category = item['category']
        # add to appropriate list
        if category in ['sweater', 't-shirt', 'blouse', 'cardigan', 'polo', 'tank top', 'shirt']:
            tops.append(id) # TODO why am I appending the scores as well?
        elif category in ['dress']:
            onepiece.append(id)
        elif category in ['jeans', 'pants', 'sweatpants', 'skirt', 'shorts']:
            bottoms.append(id)
        elif category in ['boots', 'sneakers', 'footwear']:
            footwear.append(id)
        elif category in ['accessory', 'hat']:
            accessories.append(id)
        elif category in ['jacket', 'hoodie', 'coat', 'vest']:
            layers.append(id)

    # Calculate the TOP fits
    # Create k fit objects for each type

    # SELECTION
    # Main Piece: TOP
    k_tops = min(k, len(tops))
    two_piece_fits = []
    # For each of the top k tops, create a two-piece fit
    for i in range(k_tops):
        two_piece_fits.append(select_ensemble(items, prompt_emb, tops[i], footwear, layers, accessories, bottoms=bottoms))

    # Main Piece: ONE PIECE
    k_onepiece = min(k, len(onepiece))
    onepiece_fits = []
    # For each of the top k onpieces, create a one-piece fit
    for i in range(k_onepiece):
        onepiece_fits.append(select_ensemble(items, prompt_emb, onepiece[i], footwear, layers, accessories))

    # COMPARISON
    # Compare the average similarity scores for each fit and determine the best k fits
    best_k_fits = [] # list of tuples (list of item id, similarity)
    for item_list in two_piece_fits+onepiece_fits:
        similarity_to_prompt = get_similarity_to_prompt(items, prompt_emb, item_list)
        if len(best_k_fits)<k:
            best_k_fits.append((item_list, similarity_to_prompt))
        elif best_k_fits[-1][1] < similarity_to_prompt:
            print(f" best_k_fits: {best_k_fits}")
            best_k_fits[-1] = (item_list, similarity_to_prompt)
        best_k_fits = sorted(best_k_fits, key=lambda i: i[1], reverse=True)

    # Creating Fit objects
    fits = []
    for fit in best_k_fits:
        fit_items = [get_item_from_id(items, id) for id in fit[0]]
        fit_tags = list(set(tag for id in fit[0] for tag in get_item_from_id(items, id)["styling"]["tags"]))
        fits.append({
            "items":fit_items,
            "tags":fit_tags
        })

    return fits



# Selects the best item matches from the given categories for a given main piece
# @param main_piece: an item id
#        footwears, layers, accessories: mandatory item ids list arguments
#        bottoms: optional item id list argument
# @return: list of item objects
def select_ensemble(items, prompt_emb, main_piece, footwears, layers, accessories, bottoms=None):
    wip_ensemble = [main_piece]
    
    group_center = item_average(items, wip_ensemble, prompt_emb=prompt_emb)
    # Secondary: BOTTOM
    bottom = None
    if bottoms is not None:
        bottom = compare_item_embeddings(items, group_center, bottoms)[0][0]

        wip_ensemble.append(bottom)
        group_center = item_average(items, wip_ensemble, prompt_emb=prompt_emb)
    # Secondary: FOOTWEAR
    footwear = compare_item_embeddings(items, group_center, footwears)[0][0]

    wip_ensemble.append(footwear)
    group_center = item_average(items, wip_ensemble, prompt_emb=prompt_emb)
    # Optional: ACCESSORIES
    accessory = compare_item_embeddings(items, group_center, accessories)[0][0] #TODO only add for a certain threshold

    # Add accessory only if it is similar enough
    if float(cosine_similarity(np.asarray(get_item_from_id(items, accessory)['embedding'], dtype=np.float32).reshape(1, -1), prompt_emb.reshape(1, -1))[0][0]) >= ACCESSORIES_THRESHOLD:
        wip_ensemble.append(accessory)
        group_center = item_average(items, wip_ensemble, prompt_emb=prompt_emb)
    # Optional: LAYERS
    layer = compare_item_embeddings(items, group_center, layers)[0][0]

    # Add layer only if it is similar enough
    if float(cosine_similarity(np.asarray(get_item_from_id(items, layer)['embedding'], dtype=np.float32).reshape(1, -1), prompt_emb.reshape(1, -1))[0][0]) >= LAYERS_THRESHOLD:
        wip_ensemble.append(layer)
        group_center = item_average(items, wip_ensemble, prompt_emb=prompt_emb)

    ensemble = []
    for i in wip_ensemble:
        if i is not None:
            ensemble.append(i)

    return ensemble

# Determines the average vector for the items provided
# @param items: list of all items
#        chosen_items: list of item ids for the items whose vectors should be averaged
#        prompt_emb: embedding of the prompt
# @return: a numpy vector, the same shape as embedding
def item_average(items, chosen_items, prompt_emb=None):
    # store the vectors as numpy
    vectors_array = []
    for i in chosen_items:
        #print(f"item: {i}")
        vectors_array.append(get_item_from_id(items, i)['embedding'])
    vectors_array = np.asarray(vectors_array, dtype=np.float32)
    average_vector = np.mean(vectors_array, axis=0)
    if prompt_emb is not None:
        average_vector = np.mean(np.array([average_vector, prompt_emb*PROMPT_WEIGHT]), axis=0)
    return average_vector

# Finds the k items with closest embedding vectors to given center
# @param items: list of all items
#        center: a numpy embedding vector
#        items: a item ids for the items to be compard
#        k: an integer number of closest vectors to choose
# @return: list of k tuples (id, similarity to prompt)
def compare_item_embeddings(items, center, chosen_items, k=1):
    # determine k
    k = min(k, len(chosen_items))
    # find similarity scores
    similarities = {}
    for i in chosen_items:
        item_object = get_item_from_id(items, i)
        i_emb = np.array(item_object['embedding'])
        i_id = item_object['id']
        # compute cosine similarity (as a regular float)
        similarities[i_id] = float(cosine_similarity(i_emb.reshape(1, -1), center.reshape(1, -1))[0][0])
    
    # Sort similarities
    # create a list of tuples (item id, similarity score to prompt)
    sorted_similarities = [(id, similarities[id]) for id in similarities]
    # sort most similar to least similar
    sorted_similarities = sorted(sorted_similarities, key=lambda item: item[1], reverse=True)

    # Return best k matches
    return sorted_similarities[:k]

# Returns the simillarity of the center of the fit embeddings to the prompt embedding
# @param items: list of all items
#        prompt_emb: embedding of the prompt string
#        fit: list of item ids in the fit
# @return: float (similarity score)
def get_similarity_to_prompt(items, prompt_emb, fit):
    fit_center = item_average(items, fit)
    return float(cosine_similarity(fit_center.reshape(1, -1), prompt_emb.reshape(1, -1))[0][0])

# retunrs the item object for the corresponding id
# @param items: list of all item objects
#        id: item id
# @return: item object for the corresponding id
def get_item_from_id(items, id):
    # find item with given id
    return next((item for item in items if item["id"] == id), None)

"""
    # determine item categories in which the user has items
    available_items = []
    for category in (tops, bottoms, footwear):
        if len(category) != 0:
            available_items.append(category)

    # determine tags associated with this fit TODO: move this to the end
    fit_1_tags = list(set(tag for item in available_items for tag in item[0][0]["styling"]["tags"]))

    # determine items in this fit
    fit_1_items = list(item[0][0] for item in available_items)

    # determine accessories, based on similarity threshold
    THRESHOLD = .8
    if len(accessories) != 0:
        for item in fit_1_items:
            for accessory in accessories:
                if float(cosine_similarity(np.array(item['embedding']).reshape(1, -1), np.array(accessory['embedding']).reshape(1, -1))[0][0]) < THRESHOLD:
                    fit_1_items.append(accessory)

    # create the fit object
    fit_1 = {
        "items":fit_1_items,
        "tags":fit_1_tags
    }

    # return fits in a list
    return [fit_1]
"""
