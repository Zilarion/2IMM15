from models.Data import Data


class Author:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.co_authors = set()
        self.papers = set()
        self.cluster = None
        self.influence = 0
        self.topics = set()

    def add_co_author(self, authors):
        for coauthor in authors:
            if self.id != coauthor:
                self.co_authors.add(coauthor)

    def add_paper(self, paper_id):
        self.papers.add(paper_id)

    def to_string(self):
        return "id: " + str(self.id) + " name: " + self.name

    def to_json(self, with_co_authors=False, with_papers=False):
        result = {
            'id': self.id,
            'name': self.name,
            'influence': self.influence
        }

        if with_co_authors:
            co_authors = []
            for author_id in self.co_authors:
                co_authors.append(Data.authors[author_id].to_json())
            result['coAuthors'] = co_authors

        if with_papers:
            papers = []
            for paper_id in self.papers:
                papers.append(Data.papers[paper_id].to_json())
            result['papers'] = papers

        if self.cluster is not None:
            result['cluster'] = self.cluster

        return result
