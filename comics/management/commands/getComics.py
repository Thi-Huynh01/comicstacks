from django.core.management.base import BaseCommand
from django.conf import settings
from comics.models import Comic, Author, Publisher
from datetime import datetime
import requests

"""
Author object is getting illustrators at some points. 
Implement Illustrator table in models.
Find "role" in JSON structure.
"""

class Command(BaseCommand):
    # Usage - python manage.py getComics {publisher} {character_name} {limit}
    help = "Import comics using the ComicVine API"

    # Define arguments
    def add_arguments(self, parser):
        parser.add_argument(
            'publisher', 
            type=str,
            help='ex. DC Comics, Marvel, Dark Horse'
            )
        parser.add_argument(
            'character',
            type=str,
            help='ex. Superman, Spider-Man, Batman'
        )
        parser.add_argument(
            'limit',
            type=int,
            help='5,10, etc'
        )
        return super().add_arguments(parser)

    def handle(self, *args, **kwargs):

        # build web request 
        url = "https://comicvine.gamespot.com/api/issues"
        params = {
            "api_key": settings.COMICVINE_API_KEY,
            "format": "json",
            "limit": kwargs['limit'],
            "field_list": "id,name,issue_number,image,volume",
            "filter": "name:" + str(kwargs['character'])
        }
        #print(params)
        headers = {
            "User-Agent": "Comic-Stacks/1.0 - " + settings.COMICVINE_USER
        }
        print(f"Connecting to {url}")
        response = requests.get(url, params=params, headers=headers)
        
        # API Results
        data = response.json()
        #comic = data["results"][0]
        #print (comic["id"])

        id_no = []

        # Get only the Issue IDs and store them in list
        print("Storing comic IDs...")
        for comic in data["results"]:
            id_no.append(str(comic["id"]))        

        #print(id_no)

        # Iterate through list, concat the unique issue id with the API endpoint URL
        print ("Iterating through ID list...")
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
            
            for person in creators:
                if person and person['role'] == "writer":
                    print(f"\n{person['name']}: {person['role']}")
                    author = person['name']
                    author_obj, created = Author.objects.get_or_create(
                        name=author,
                        desc="placeholder Text for " + author
                    )
                    break
                    

            #print(author)
                    
            # Store details in variables
            title = issue["name"]
            iss_no = issue["issue_number"]
            rel_date = issue["cover_date"]
            image_url = issue["image"]["original_url"]


            #print (f"{title} Issue # {iss_no} by {author}. Released in {rel_date}\n{image_url}")

            # Create publisher and author before comic. Order is important for foreign key constraints
            publisher_obj, created = Publisher.objects.get_or_create(name=str(kwargs['publisher']))

            if rel_date:
                try:
                    release = datetime.strptime(rel_date, "%Y-%m-%d").date()
                except ValueError:
                    print(f"Invalid format for Date: {rel_date}")
            
            # Get all details and store
            Comic.objects.get_or_create(
                title=title,
                character=str(kwargs['character']),
                author=author_obj,
                issue_no=iss_no,
                publisher = publisher_obj,
                release_date=release,
                cover_image=image_url,
            )
            print(f"Comic {i + 1} stored...")

        self.stdout.write(self.style.SUCCESS("Script ran successfully"))
