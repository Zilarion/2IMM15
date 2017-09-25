from flask import jsonify
from models.Data import Data


def handle_query(query_content):
    query = query_content.get('query')

    result = []
    count = 0
    # Just randomly reply with the first 50 papers for now
    for paper_id, paper in Data.papers.items():
        if count >= 50:
            break
        count += 1
        authors = paper.authors
        author_names = []
        for author_id in authors:
            author_names.append(Data.authors[author_id].name)
        result.append(paper.to_json())
    return jsonify(result)
