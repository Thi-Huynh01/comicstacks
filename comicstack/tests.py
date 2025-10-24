from django.conf import settings
import requests

# Create your tests here.

# Testing API Connection
def test_api(comic_name):
    #url = "https://comicvine.gamespot.com/api/issues"
    url = "https://comicvine.gamespot.com/api/issue/4000-675"

    params = {
        "api_key": settings.COMICVINE_API_KEY,
        "format": "json",
        "field_list": "id,name,issue_number,image",
    }

    #print(params)
    headers = {
        "User-Agent": "Comic-Stacks/1.0 -" + settings.COMICVINE_USER
    }
    response = requests.get(url,params=params,headers=headers)
    
    # API Results
    data = response.json()
    comic = data["results"]
    print (comic["name"], comic["issue_number"])

    # Loop through all comics
    #for comic in data["results"]:
     #   print(comic)