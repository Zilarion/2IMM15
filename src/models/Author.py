class Author:

    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.co_authors = set()


    def add_co_author(self, author):
        if author.id != self.id:
            self.co_authors.add(author)

    def to_string(self):
        return "id: " + str(self.id) + " name: " + self.name
