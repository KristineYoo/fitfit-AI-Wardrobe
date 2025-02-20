import requests

# Set Drexel University's coordinates
latitude = 39.9566
longitude = -75.1899

# Get metadata for Drexel's location
points_url = f"https://api.weather.gov/points/{latitude},{longitude}"
headers = {
    'User-Agent': 'Fitfit'
}

points_response = requests.get(points_url, headers=headers)
points_data = points_response.json()

# Extract the forecast URL
forecast_url = points_data['properties']['forecast']

# Fetch the forecast data
forecast_response = requests.get(forecast_url, headers=headers)
forecast_data = forecast_response.json()

# Print the weather forecast
for period in forecast_data['properties']['periods']:
    print(f"{period['name']}: {period['detailedForecast']}")