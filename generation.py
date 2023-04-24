import string 
import random
import os
import django

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "typingtest.settings")
django.setup()

from typer_api.models import ProgrammerTestScript

alphabet = string.ascii_lowercase + string.digits

def line_break():
    print("\n")

def generate_UUID():
    return ''.join(random.choices(alphabet, k=8))

def add_newlines(a_list):
    for i in range(len(a_list)):
        a_list[i] = a_list[i] + "\n"

# ***************************************************************************************************************
# Implementation for manually adding tests to DB.

def manually_add_test():
    language_codes = ["P", "JS", "J"]
    languages = {
        "P": "python",
        "JS": "javascript",
        "J": "java",
    }
    action_codes = ["C", "N"]

    line_break()
    print("Time to add a new test to the DB")
    line_break()
    print("Which language would you like to upload tests for?")

    language_code = ""
    while language_code not in language_codes:
        print("P = Python, JS = Javascript, J = Java")
        line_break()
        language_code = input("Type the language code here: ")
        line_break()

    action = print("Would you like to copy a test into this script, or reference a file in codeexamples?")

    action = ""
    while action not in action_codes:
        print("C = Copy a typing test, N = Reference a existing file")
        line_break()
        action = input("Type the action code here: ")
        line_break()

        contents = []

    if action == "C":
        print("You chose to copy a new file into the DB")
        print("Enter/Paste your content. Type Enter, then Ctrl-D to save it.")

        while True:
            try:
                line = input()
            except EOFError:
                break
            contents.append(line)
        line_break()

        add_newlines(contents)


    if action == "N":
        print("You chose to reference an existing file in the code examples dir: ")
        file_name = input("Type the name of that file here: ")

        file_path = os.path.join(os.path.abspath("typer_api/codeexamples"), languages[language_code], file_name)

        print("Searching the file path: ", file_path)

        try:
            with open(file_path, "r") as f:
                contents = f.readlines()
        except EnvironmentError:
            print("Something went wrong opening the filename", file_name)
            return
        
    print(contents)
    line_break()
    answer = input("Is this ready to add to the site? (N = no, n = no, <anything-else> = yes)")
    if (answer == "N" or answer == "n"):
        return
    
        


    print("Removing the file from codeexamples")
    try:
        os.remove(file_path)
    except Exception:
        print("something went wrong deleting the file")
        return

    print("Adding it to the db")
    new_db_entry = ProgrammerTestScript(script=contents,
                                         language=languages[language_code],
                                         length=len(contents))
    new_db_entry.save()







# ***************************************************************************************************************
# Implementation for manually adding files to code examples



def manually_add_to_codeexamples():

    language_codes = ["P", "JS", "J"]
    languages = {
        "P": "Python",
        "JS": "Javascript",
        "J": "Java",
    }

    line_break()
    print("Copy text into a new codeexamples file")
    line_break()
    print("What language are you adding to?")

    language_code = ""
    while language_code not in language_codes:
        print("P = Python, JS = Javascript, J = Java")
        line_break()
        language_code = input("Type the language code here: ")
        line_break()

    print("Enter/Paste your content. Type Enter, then Ctrl-D to save it.")
    contents = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        contents.append(line)

    line_break()

    add_newlines(contents)

    unique_filename = str(generate_UUID()) +".txt"

    file_path = os.path.join(os.path.abspath("typer_api/codeexamples"), languages[language_code], unique_filename)

    print("Saving the file with the unique file name " + unique_filename, "at the path: \n" + file_path)

    with open(file_path, "w") as f:
        f.writelines(contents)
    
    print("File created")



# ***************************************************************************************************************
# Main

print("Working with test scripts")

command_code = ""

while command_code != "1":
    print("1 = Exit | 2 = Add a new script to the DB | 3 = Add a new script to codeexamples")
    command_code = input("Input your command here: ")

    if command_code == "2":
        manually_add_test()
    if command_code == "3":
        manually_add_to_codeexamples()







