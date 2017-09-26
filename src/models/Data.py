class Data:
    authors = dict()
    papers = dict()
    inverted_index = {}

    def __init__(self):
        pass

    @classmethod
    def add_author(cls, author):
        cls.authors[author.id] = author

    @classmethod
    def add_paper(cls, paper):
        cls.papers[paper.id] = paper
