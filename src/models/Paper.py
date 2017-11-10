from models.Data import Data
from topic_model import map_topic_ids


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
            'topic': map_topic_ids([self.topic]),
            'authors': [],
            'related': [],
            'influence': self.influence
        }
        authors = []
        for author_id in self.authors:
            authors.append(Data.authors[author_id])
        authors.sort(key=lambda x: x.influence, reverse=True)
        for author in authors[:20]:
            result['authors'].append(author.to_json(with_co_authors))

        related_papers = []
        if with_related:
            for paper_id in self.related_papers:
                if paper_id in Data.papers:
                    related_papers.append(Data.papers[paper_id])
        related_papers.sort(key=lambda x: x.influence, reverse=True)
        for related_paper in related_papers[:20]:
            result['related'].append(related_paper.to_json())

        return result
