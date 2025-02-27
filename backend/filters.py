"""
Methods to filter out non-applicable items before recommendation
Based on:
* Visibility
* Weather and item thickness
"""

def filter_visibility(items):
    filtered = []
    # filter items by:
    for i in items:
        # visibility
        if i['visibility'] == 'shown':
            filtered.append(i)
    return filtered