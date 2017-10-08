from flask import jsonify
from fuzzywuzzy import process

from index_computation import query
from models.Data import Data


def handle_query(query_content):
    q = query_content.get('query')
    query_domain = query_content.get('domain')
    if q is None:
        return jsonify([])
    return jsonify(route_query(q, query_domain))


def route_query(q, query_domain):
    if query_domain == 'authors':
        return handle_author_query(q)
    if query_domain == 'papers':
        return handle_paper_query(q)


def handle_author_query(q):
    author_names = []
    for key, author in Data.authors.items():
        author_names.append(author.name)
    matches = process.extract(q, author_names)

    result = []
    for record in matches:
        json = dict()
        json['name'] = record[0]
        json['score'] = record[1]
        result.append(json)
    return result


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
