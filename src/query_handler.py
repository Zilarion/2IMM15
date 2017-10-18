from flask import jsonify
from fuzzywuzzy import process

from index_computation import query, queryLM
from models.Data import Data


def handle_query(query_content):
    q = query_content.get('query')
    query_domain = query_content.get('domain')
    if q is None:
        return jsonify([])
    return jsonify(route_query(q, query_domain))


def route_query(q, query_domain):
    if query_domain == 'authors':
        return handle_authors_query(q)
    if query_domain == 'papers':
        return handle_papers_query(q)
    if query_domain == 'paper':
        return handle_paper_query(q)
    if query_domain == 'author':
        return handle_author_query(q)


def handle_authors_query(q):
    author_names = []
    name_dict = dict()
    for key, author in Data.authors.items():
        author_names.append(author.name)
        name_dict[author.name] = author
    matches = process.extract(q, author_names)

    result = []
    for record in matches:
        json = name_dict[record[0]].to_json(True)
        json['score'] = record[1]
        result.append(json)
    return {'authors': result}


def handle_papers_query(q):
    ranking = query(q, Data.inverted_index, len(Data.papers))
    # ranking based on language model
    # TODO to incorporate both rankings
    # ranking = queryLM(q, Data.inverted_index, len(Data.papers))
    result = []
    topics = {}
    count = 0
    # TODO pagination
    #    for paper_id, rank_value  in ranking.items():
    for rank_value, paper_id in ranking:
        paper = Data.papers[paper_id]
        authors = paper.authors
        author_names = []
        for author_id in authors:
            author_names.append(Data.authors[author_id].name)
        json = paper.to_json()
        json['score'] = rank_value
        result.append(json)
        topics = update_topics(topics, paper_id)
        count += 1
        if count > 20:
            break
    return {'papers': result, 'topics': [v for v in topics.values()]}


def update_topics(old_topics, paper_id):
    new_topics = old_topics
    topic_id = Data.papers_topic_label[paper_id]

    if topic_id in new_topics:
        new_topics[topic_id]['number'] += 1
    else:
        new_topics[topic_id] = {'number': 1, 'label': str(topic_id)}
    return new_topics


def handle_paper_query(q):
    paper_id = q
    return {'paper': Data.papers[paper_id].to_json()}


def handle_author_query(q):
    author_id = q
    return {'author': Data.authors[author_id].to_json(True, True)}
