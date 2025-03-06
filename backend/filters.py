"""
Methods to filter out non-applicable items before recommendation
Based on:
* Visibility
* Weather and item thickness

Temperature Cutoffs
temp > 70, no coats
(add more rules later)
"""
from weather_service import get_temperature


"""
Array of item objects -> array of item objects
Description: Method to filter out non-applicable items before recommendation
    Based on:
    * Visibility
    * Weather and item thickness
"""
def filter(items):
    filtered = []
    # filter items by:
    for i in items:
        # visibility
        if filter_visibility(i) and filter_thickness(i):
            filtered.append(i)
    return filtered

"""
clothing item object -> boolean
Description: checks whether the item should be displayed based on visibility attribute. If so, returns True.
"""
def filter_visibility(i):
    return i['visibility'] == 'shown'


"""
clothing item object -> boolean
Description: checks whether the item should be displayed based on thickness attribute. If so, returns True.
"""
def filter_thickness(item):
    # get daily temperature
    temperature = int(get_temperature())
    print(temperature)

    # check if item is a coat and the temp is > 70
    if temperature > 70 and item['category'] == "Coat" or item['category'] == "Jacket":
        return False
    
    return True