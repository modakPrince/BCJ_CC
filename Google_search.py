import requests

def get_geolocation(api_key, search_string):
    base_url = "https://us1.locationiq.com/v1/search.php"  # Correct endpoint
    params = {
        'key': api_key,
        'q': search_string,
        'format': 'json',
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data and isinstance(data, list):  # Ensure data is a valid list
            result = {
                'place_id': data[0].get('place_id', ''),
                'lat': data[0].get('lat', ''),
                'lon': data[0].get('lon', ''),
                'display_name': data[0].get('display_name', ''),
            }
            return result
        else:
            print("Error: Unexpected response format")
            return None
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Corrected API Key (removed trailing space)
api_key = 'pk.71c93f03731ac10faf75d7e071df51c1'

# User input
search_string = input("Enter the location: ")

# Fetch and display the geolocation
result = get_geolocation(api_key, search_string)
if result:
    print("\nOutput:")
    for key, value in result.items():
        print(f"{key}: {value}")