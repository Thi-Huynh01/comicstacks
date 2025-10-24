from django.core.management.base import BaseCommand
from django.conf import settings
from comics.models import Comic, Author, Publisher
from datetime import datetime
import requests

class Command(BaseCommand):
    help = "Import comics from ComicVine API"

    # Testing API Connection
    def handle(self, *args, **kwargs):
        url = "https://comicvine.gamespot.com/api/issues"
        params = {
            "api_key": settings.COMICVINE_API_KEY,
            "format": "json",
            "limit": 10,
            "field_list": "id,name,issue_number,image,volume",
            "filter": "name:superman"
        }
        #print(params)
        headers = {
            "User-Agent": "Comic-Stacks/1.0 - " + settings.COMICVINE_USER
        }
        response = requests.get(url, params=params, headers=headers)
        
        # API Results
        data = response.json()
        #comic = data["results"][0]
        #print (comic["id"])

        id_no = []

        for comic in data["results"]:
            id_no.append(str(comic["id"]))        

        #print(id_no)

        for i in range (len(id_no)):
            url = "https://comicvine.gamespot.com/api/issue/4000-" + id_no[i]
            params = {
                "api_key": settings.COMICVINE_API_KEY,
                "format": "json",
                "field_list": "name,issue_number,image,person_credits,cover_date"
            }
            response = requests.get(url, params=params, headers=headers)
            comic_details = response.json()
            issue = comic_details["results"]
            creators = comic_details.get("results", {}).get("person_credits", [])

            #for person in creators:
                #author = person['name']
                #print(f" - {person['name']} ({person['role']})")
                
            title = issue["name"]
            iss_no = issue["issue_number"]
            rel_date = issue["cover_date"]
            image_url = issue["image"]["original_url"]

            if creators:
                author = creators[0]["name"]
            else:
                author = "N/A"

            #print (f"{title} Issue # {iss_no} by {author}. Released in {rel_date}\n{image_url}")
            publisher_obj, created = Publisher.objects.get_or_create(name="DC Comics")
            
            author_obj, created = Author.objects.get_or_create(
                name=author,
                desc="placeholder Text for " + author
            )

            if rel_date:
                try:
                    release = datetime.strptime(rel_date, "%Y-%m-%d").date()
                except ValueError:
                    print(f"Invalid format for Date: {rel_date}")

            Comic.objects.get_or_create(
                title=title,
                author=author_obj,
                issue_no=iss_no,
                publisher = publisher_obj,
                release_date=release,
                cover_image=image_url,
                
            )

        self.stdout.write(self.style.SUCCESS("✅ Successfully imported comics"))