from models.Data import Data


class Paper:
    def __init__(self, id, year, title, event_type, pdf_name, abstract, paper_text):
        self.id = id
        self.year = year
        self.title = title
        self.event_type = event_type
        self.pdf_name = pdf_name
        self.abstract = abstract
        self.paper_text = paper_text
        self.authors = set()
        self.related_papers = dict()
        self.topic = '-'

    def add_author(self, author_id):
        self.authors.add(author_id)

    def to_string(self):
        return "id: " + str(self.id) + " tile: " + self.title

    def to_json(self, with_co_authors=False):
        authors = []
        for author_id in self.authors:
            authors.append(Data.authors[author_id].to_json(with_co_authors))
        return {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'authors': authors,
            'link': 'https://papers.nips.cc/paper/' + self.pdf_name,
            'topic': self.topic
            }
