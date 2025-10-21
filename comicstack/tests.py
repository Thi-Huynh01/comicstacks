from django.conf import settings
import requests

# Create your tests here.

# Testing API Connection
def test_api(comic_name):
    url = "https://comicvine.gamespot.com/api/issues"
    params = {
        "api_key": settings.COMICVINE_API_KEY,
        "format": "json",
        "limit": 5,
        "field_list": "name,issue_number,cover_date,image,volume,creators",
        "filter": "name:" + comic_name
    }

    #print(params)

    headers = {
        "User-Agent": "Comic-Stacks/1.0 (huynhthi265@gmail.com)"
    }

    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    comic = data["results"][0]
    print(data.keys())

    for comic in data["results"]:
        print(comic["name"])