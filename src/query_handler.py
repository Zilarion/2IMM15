from flask import jsonify, json
from fuzzywuzzy import process

from index_computation import query, queryLM
from models.Data import Data
import time

from topic_model import map_topic_ids

pageSize = 20


def handle_query(query_content):
    q = query_content.get('query')
    query_domain = query_content.get('domain')
    if q is None:
        return jsonify([])
    start = time.time()
    result = route_query(q, query_domain, query_content)
    end = time.time()
    result['duration'] = (end-start)
    return jsonify(result)


def route_query(q, query_domain, query_content):

    if query_domain == 'authors':
        return handle_authors_query(q, query_content)
    if query_domain == 'papers':
        return handle_papers_query(q, query_content)
    if query_domain == 'paper':
        return handle_paper_query(q)
    if query_domain == 'author':
        return handle_author_query(q)


def handle_authors_query(q, query_content):
    author_names = []
    name_dict = dict()
    for key, author in Data.authors.items():
        author_names.append(author.name)
        name_dict[author.name] = author
    matches = process.extractBests(q, author_names, limit=len(Data.authors.items()), score_cutoff=80)

    result = []
    count = 0
    page = query_content.get('page')
    if page is None:
        page = 0

    for record in matches:
        count += 1
        if count >= page * pageSize:
            json = name_dict[record[0]].to_json(True)
            json['score'] = record[1]
            result.append(json)

        if count >= (page + 1) * pageSize:
            break
    return {'authors': result, 'count': len(result), 'total': len(matches)}


def handle_papers_query(q, query_content):
    ranking = query(q, Data.inverted_index, len(Data.papers))
    # ranking based on language model
    # TODO to incorporate both rankings
    # ranking = queryLM(q, Data.inverted_index, len(Data.papers))
    result = []
    topics = {}
    count = 0
    topic = query_content.get('topic')

    for rank_value, paper_id in ranking:
        paper = Data.papers[paper_id]
        if topic is None or paper.topic == topic:
            count += 1
            if count <= pageSize:
                authors = paper.authors
                author_names = []
                for author_id in authors:
                    author_names.append(Data.authors[author_id].name)
                json = paper.to_json()
                json['score'] = rank_value
                result.append(json)
        topics = update_topics(topics, paper)
    return {'papers': result, 'count': len(result), 'total': len(ranking), 'topics': [v for v in topics.values()]}


def update_topics(old_topics, paper):
    new_topics = old_topics
    topic_id = paper.topic

    if topic_id in new_topics:
        new_topics[topic_id]['number'] += 1
    else:
        new_topics[topic_id] = {'number': 1, 'topic': map_topic_ids([topic_id])}
    return new_topics


def handle_paper_query(q):
    paper_id = q
    return {'paper': Data.papers[paper_id].to_json(with_related=True)}


def handle_author_query(q):
    author_id = q
    return {'author': Data.authors[author_id].to_json(True, True)}
