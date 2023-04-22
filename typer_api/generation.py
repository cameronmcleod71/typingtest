




# ***************************************************************************************************************
# Implementation for manually adding tests to DB.

def manually_add_test():
    language_codes = ["P", "JS", "J"]
    languages = {
        "P": "Python",
        "JS": "Javascript",
        "J": "Java",
    }
    action_codes = ["C", "N"]

    print("Time to add a new test to the DB")

    print("Which language would you like to upload tests for?")

    language_code = ""
    while language_code not in language_codes:
        print("P = Python, JS = Javascript, J = Java")
        language_code = input("Type the language code here: ")

    action = print("Would you like to copy a test into this script, or reference a file in codeexamples?")

    action = ""
    while action not in action_codes:
        print("C = Copy a typing test, N = Reference a existing file")
        action = input("Type the action code here: ")

    if action == "C":
        print("You chose to copy a new file into the DB")
        input("Copy the file here: ")

    if action == "N":
        print("You chose to reference an existing file in the code examples dir: ")
        input("Type the name of that file here: ")
        
    



