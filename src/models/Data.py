class Data:
    authors = {}
    papers = []

    def __init__(self):
        pass

    def add_author(self, author):
        self.authors[author.id] = author

    def add_paper(self, paper):
        self.papers[paper.id] = paper
