from lib import scholar
from models.Data import Data
import time


def fetch_citations():
    return
    for key, paper in Data.papers.items():
        time.sleep(0.5)
        fetch_paper(paper.title)


def fetch_paper(paper_title):
    querier = scholar.ScholarQuerier()
    settings = scholar.ScholarSettings()
    querier.apply_settings(settings)

    query = scholar.SearchScholarQuery()
    query.set_phrase(paper_title)
    query.set_scope(True)
    query.set_num_page_results(1)

    querier.send_query(query)

    print(paper_title)
    print(len(querier.articles))
    if len(querier.articles) > 0:
        print(querier.articles[0]['num_citations'])
