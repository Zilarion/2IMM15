class Data:
    authors = dict()
    papers = dict()
    papers_topic_label = dict()
    inverted_index = dict()
    citations = dict()
    author_clusters = dict()  # dictionary from cluster nr -> author.id's in the cluster
    length = dict()  # length of each doc thus dict

    def __init__(self):
        pass

    @classmethod
    def add_author(cls, author):
        cls.authors[author.id] = author

    @classmethod
    def add_paper(cls, paper):
        cls.papers[paper.id] = paper
