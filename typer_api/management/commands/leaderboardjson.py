from django.core.management.base import BaseCommand, CommandError
from pathlib import Path
from typer_api.models import CompletedTypingTest
import os
import json

APP_DIR = Path(__file__).resolve().parent.parent.parent

class Command(BaseCommand):
    
    def add_arguments(self, parser):
       parser.add_argument("-b", "--blank", action="store_true", help="Just create a blank object")
    
    def handle(self, *args, **options):
      leaderboard_dict = {
        "scores": [],
        "spots": 30,
        "lowest_score" : 0,
      }
      blank = options["blank"]
      print("Leaderboard initialized.")
      if not blank:
        print("Populating the leaderboard. (Specify -b option to leave the leaderboard blank next time.)")
        tests = CompletedTypingTest.objects.filter(test_type="programmer").order_by("-wpm")[:30]
        tests = list(tests) # need to order by date ascending second

        leaderboard_dict["lowest_score"] = tests[-1].wpm

        for entry in tests:
          leaderboard_dict["scores"].append({"name":entry.owner.username,"score":entry.wpm,"time_taken":entry.time_taken})
        
      leaderboard_json = json.dumps(leaderboard_dict, indent=4)
      with open(os.path.join(APP_DIR,"leaderboard.json"), "w") as outfile:
        outfile.write(leaderboard_json)
