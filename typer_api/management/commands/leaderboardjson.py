from django.core.management.base import BaseCommand, CommandError
from pathlib import Path
from typer_api.models import CompletedTypingTest
import os
import json

APP_DIR = Path(__file__).resolve().parent.parent.parent

class Command(BaseCommand):
    
    leaderboard_dict = {
       "top30": [],
       "filled": 0,
       "lowest_score" : 0,
    }
    
    def add_arguments(self, parser):
       parser.add_argument("-b", "--blank", action="store_true", help="Just create a blank object")
    
    def handle(self, *args, **options):
      blank = options["blank"]
      print("Leaderboard initialized.")
      if not blank:
         print("Populating the leaderboard. (Specify -b option to leave the leaderboard blank next time.)")
         tests = CompletedTypingTest.objects.filter(type="programmer")
         print(tests)

         # make query for top 30 highest scored entries