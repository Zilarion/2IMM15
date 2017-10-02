from flask import jsonify

from index_computation import query
from models.Data import Data


def handle_query(query_content):
    q = query_content.get('query')
    query_type = query_content.get('type')
    return jsonify(route_query(q, query_type))


def route_query(q, query_type):
    return {
        'paper': handle_paper_query(q),
        'author': handle_author_query(q),
    }.get(query_type, handle_paper_query(q))


def handle_author_query(q):
    return []


def handle_paper_query(q):
    ranking = query(q, Data.inverted_index, 10)

    result = []
    for rank_value, paper_id in ranking:
        paper = Data.papers[paper_id]
        authors = paper.authors
        author_names = []
        for author_id in authors:
            author_names.append(Data.authors[author_id].name)
        json = paper.to_json()
        json['score'] = rank_value
        result.append(json)
    return result
