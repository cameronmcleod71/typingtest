from random import choice
import os
from django.conf import settings

# _special_test_chars = ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','\\','|','`','~']

class SpecialTypingTest:

    def __init__(self):
        self.special_test_chars = ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','|','`','~']
        self.special_char_test = []

    def get_next_char(self):
        next_char = choice(self.special_test_chars)
        return next_char
    
    def generate_test(self):
        for i in range(50):
            new_line = []
            for j in range(10):
                char_obj = {}
                test_char = self.get_next_char()
                char_obj['expected'] = test_char
                char_obj['given'] = ''
                new_line.append(char_obj)

            self.special_char_test.append(new_line)
        
    def get_test(self):
        return self.special_char_test


def example_programming_typing_test():
    lines = []
    example_file = os.path.abspath('typer_api/rawscripts.txt')
    with open(example_file, 'r') as f:
        lines = f.readlines()

    # no_newlines = [ line.strip("\n") for line in lines]

    parsed_chars = []

    for line in lines:
        row = []
        skip_space = False 
        for c in range(0,len(line)):
            char_object = {}
            if line[c] == " ":
                if not skip_space:
                    space_counter = 1
                    next_char_index = c + 1
                    while (next_char_index < len(line)) and (line[next_char_index] == " "):
                        space_counter+=1
                        next_char_index+=1
                    char_object['space'] = str(space_counter)
                    char_object['given'] = ""
                    skip_space = True
            else:
                skip_space = False
                char_object["expected"] = line[c]
                char_object["given"] = ""
            if len(char_object) != 0:
                row.append(char_object)
        # if len(row) == 0:
        #     row.append({'space': '1'})
        parsed_chars.append(row)
    return(parsed_chars)



        
