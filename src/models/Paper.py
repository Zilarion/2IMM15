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
        self.related_papers = set()
        self.topic = '-'
        self.influence = 0

    def add_author(self, author_id):
        self.authors.add(author_id)

    def to_string(self):
        return "id: " + str(self.id) + " tile: " + self.title

    def to_json(self, with_co_authors=False, with_related=False):
        result = {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'link': 'https://papers.nips.cc/paper/' + self.pdf_name,
            'topic': self.topic,
            'authors': [],
            'related': [],
            'influence': self.influence
        }
        for author_id in self.authors:
            result['authors'].append(Data.authors[author_id].to_json(with_co_authors))

        if with_related:
            for paper_id in self.related_papers:
                result['related'].append(Data.papers[paper_id].to_json())
        return result
