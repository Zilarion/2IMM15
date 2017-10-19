class Data:
    authors = dict()
    papers = dict()
    inverted_index = dict()
    citations = dict()
    length = dict()  # length of each doc thus dict

    def __init__(self):
        pass

    @classmethod
    def add_author(cls, author):
        cls.authors[author.id] = author

    @classmethod
    def add_paper(cls, paper):
        if paper.title is not 'None':
            cls.papers[paper.id] = paper
