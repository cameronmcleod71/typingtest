from random import choice

# _special_test_chars = ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','\\','|','`','~']

class SpecialTypingTest:

    def __init__(self):
        self.special_test_chars = ['!','@','#','$','%','^','&','*','(',')','-','_','+','=','|','`','~']
        self.special_char_test = {'test':[]}

    def get_next_char(self):
        next_char = choice(self.special_test_chars)
        return next_char
    
    def generate_test(self):
        for i in range(1000):
            test_char = self.get_next_char()
            self.special_char_test['test'].append(test_char)
        
    def get_test(self):
        return self.special_char_test





    
