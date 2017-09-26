from flask import jsonify

from index_computation import query
from models.Data import Data


def handle_query(query_content):
    q = query_content.get('query')
    ranking = query(q, Data.inverted_index, 10)

    result = []
    for rank_value, paper_id in ranking:
        paper = Data.papers[paper_id]
        authors = paper.authors
        author_names = []
        for author_id in authors:
            author_names.append(Data.authors[author_id].name)
        result.append(paper.to_json())
    return jsonify(result)
