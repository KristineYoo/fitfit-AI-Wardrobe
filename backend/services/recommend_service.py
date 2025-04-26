# backend/services/recommend_service.py
# Refactored by Bao Vuong, 6:27PM 4/26/2025

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from .embedding_service import get_embedding

# Function to compute cosine similarites between the prompt and item embeddings
# @param item: user prompt from frontend (string)
# @return: list of similarities (each floats between 0 and 1) for each item in order of id's
def get_similarities(prompt, filtered):
    # embed the prompt
    prompt_emb = get_embedding(prompt)
    # compare embedding of prompt to each item and store in list
    similarities = {}
    items = filtered
    for i in items:
        i_emb = np.array(i['embedding'])
        i_id = i['id']
        # compute cosine similarity (as a regular float)
        similarities[i_id] = float(cosine_similarity(i_emb.reshape(1, -1), prompt_emb.reshape(1, -1))[0][0])
    return similarities

def configure_fit(items, similarities):
    # create ranked lists of tops, bottoms and shoes
    tops = []
    bottoms = []
    top_bottom = []
    footwear = []
    # sort similarities
    sorted_similarities = [(id, similarities[id]) for id in similarities]
    sorted_similarities = sorted(sorted_similarities, key=lambda item: item[1])[::-1]
    # iterate through most similar items, populate ranked lists
    for id, score in sorted_similarities:
        # find item with given id
        item = next((item for item in items if item["id"] == id), None)
        category = item['category']
        # add to appropriate list
        if category in ['sweater', 't-shirt']:
            tops.append((item, score))
        elif category in ['dress']:
            top_bottom.append((item, score))
        elif category in ['jeans']:
            bottoms.append((item, score))
        elif category in ['boots', 'sneakers']:
            footwear.append((item, score))

    # figure out top fits of each type
    # create fit object (fields: items, tags)
    fit_1_tags = list(set(tops[0][0]["styling"]["tags"]+
            bottoms[0][0]["styling"]["tags"]+
            footwear[0][0]["styling"]["tags"]))
    fit_1 = {
        "items":[
            tops[0][0],
            bottoms[0][0],
            footwear[0][0]
        ],
        "tags":fit_1_tags
    }
    # don't forget about tops made up of top_bottoms like dresses or onesies! (not used currently)
    fit_2_tags = list(set(top_bottom[0][0]["styling"]["tags"]+
            footwear[0][0]["styling"]["tags"]))
    fit_2 = {
        "items":[
            top_bottom[0][0],
            footwear[0][0]
        ],
        "tags":fit_2_tags
    }
    # return fit
    return [fit_1]
