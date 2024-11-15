ximport requests
from html import unescape
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials


# Spotify API credentials (set up at https://developer.spotify.com/)
SPOTIFY_CLIENT_ID = '168c07992a03424990bf8aa01c80ea41'
SPOTIFY_CLIENT_SECRET = 'e9ae7bc6638a4cbe94f1b5064ededca2'

# Authenticate with Spotify
spotify = Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
))

# Function to search for Spotify playlists dynamically
def get_spotify_playlist(query):
    try:
        results = spotify.search(q=query, type='playlist', limit=1)
        playlists = results.get('playlists', {}).get('items', [])
        if playlists:
            return playlists[0]['name'], playlists[0]['external_urls']['spotify']
        else:
            return "No playlist found", None
    except Exception as e:
        print(f"Error fetching playlist: {e}")
        return "Error fetching playlist", None

# Function to get ambiance suggestions
def get_ambiance_suggestions(dish_data):
    suggestions = {}
    region = dish_data.get("Region", "Unknown")
    calories = float(dish_data.get("Calories", 0))

    # Spotify playlist suggestion based on region
    playlist_query = region if region != "Unknown" else "World Cuisine"
    playlist_name, playlist_url = get_spotify_playlist(playlist_query)
    suggestions["Spotify Playlist"] = f"{playlist_name} ({playlist_url})" if playlist_url else playlist_name

    # Room light suggestion
    if calories < 300:
        suggestions["Room Lighting"] = "Soft warm light for a calming atmosphere"
    elif calories < 600:
        suggestions["Room Lighting"] = "Neutral white light for a casual dining experience"
    else:
        suggestions["Room Lighting"] = "Bright warm light for hearty meals"

    return suggestions

# Function to fetch data and generate suggestions
def fetch_and_suggest(api_url, dish_name):
    query_url = f"{api_url}{dish_name}"
    response = requests.get(query_url)
    
    if response.status_code == 200:
        data = response.json()
        recipes = data.get("payload", {}).get("data", [])
        
        if not recipes:
            print(f"No recipes found for '{dish_name}'.")
            return
        
        for recipe in recipes:
            recipe_title = unescape(recipe.get("Recipe_title", ""))
            if dish_name.lower() in recipe_title.lower():
                print(f"Suggestions for {recipe_title}:\n")
                suggestions = get_ambiance_suggestions(recipe)
                for key, value in suggestions.items():
                    print(f"{key}: {value}")
                print("\n")
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}, Response: {response.text}")

# Replace with the API URL
api_url = "https://cosylab.iiitd.edu.in/recipe-search/recipe?pageSize=10&searchText="
fetch_and_suggest(api_url, "Idli")
