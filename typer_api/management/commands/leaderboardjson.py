from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    
    def add_arguments(self, parser):
       parser.add_argument("-b", "--blank", action="store_true", help="Just create a blank object")
    
    def handle(self, *args, **options):
      blank = options["blank"]
      print("hello world")

      if blank:
         print("is blank")
