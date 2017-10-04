from flask import jsonify

from index_computation import query
from models.Data import Data


def handle_query(query_content):
    q = query_content.get('query')
    query_domain = query_content.get('domain')
    return jsonify(route_query(q, query_domain))


def route_query(q, query_domain):
    return {
        'papers': handle_paper_query(q),
        'authors': handle_author_query(q),
    }.get(query_domain, handle_paper_query(q))


def handle_author_query(q):
    return []


def handle_paper_query(q):
    ranking = query(q, Data.inverted_index, len(Data.papers))
    result = []
    count = 0
    # TODO pagination
    for rank_value, paper_id in ranking:
        paper = Data.papers[paper_id]
        authors = paper.authors
        author_names = []
        for author_id in authors:
            author_names.append(Data.authors[author_id].name)
        json = paper.to_json()
        json['score'] = rank_value
        result.append(json)
        count += 1
        if count > 20:
            break
    return result
