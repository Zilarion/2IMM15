# from src.test import tokenize

import sqlite3
from math import log

# SQL settings
Database = 'src/data/database.sqlite'
sql = sqlite3
c = sql.connect(database=Database)

cur = c.cursor()


def get_term_frequency(term, tokenized_document):
    return tokenized_document.count(term)


def get_total_nr_papers():
    cur.execute("SELECT count(id) FROM papers")
    # [0][0] is in order to format the output just as an integer, ugly fix
    return (cur.fetchall()[0][0])


def get_total_nr_papers2(tokenized_docs):
    return len(tokenized_docs)


# gets the number of documents containing the specified term t
def get_DF(term, indexing_dict):
    total = indexing_dict.get(term)
    if total is None:
        return 0
    else:
        return len(total)


def create_tf_idf_matrix(tokenized_docs, set_vocabulary, indexing_dict):
    total_papers = get_total_nr_papers()  # or the other option of this function
    tf_idf_matrix = {}
    voc_frequency = {}

    for doc in tokenized_docs:
        for voc in set_vocabulary:
            # df = get_DF(voc, indexing_dict)
            # tf = get_term_frequency(voc, doc)
            score = (1 + log(get_term_frequency(voc, doc), 10)) * (log(total_papers / get_DF(voc, indexing_dict)), 10)
            voc_frequency[voc] = score

        # NB: to be fixed, docID needs to be added NOT the doc text
        tf_idf_matrix[doc] = voc_frequency

    return tf_idf_matrix


# Score for a document-query pair: sum over all tf-idf indices of the query words
def calculate_score_per_doc(query_terms, doc_id, tf_idf_matrix):
    score_sum = 0
    for term in query_terms:
        score_sum = score_sum + tf_idf_matrix[doc_id][term]
    return score_sum


# calculates the score for all document-query pair and outputs a dictionary with doc_id and final score from ranking
def calculate_score(query_terms, tf_idf_matrix, tokenized_docs):
    ranking_dict = {}
    for doc in tokenized_docs:
        # TO FIX: get doc_id
        doc_id = doc
        ranking_dict[doc_id] = calculate_score_per_doc(query_terms, doc_id, tf_idf_matrix)
    return ranking_dict


def get_highest_score(ranking_dict):
    max(ranking_dict, key=ranking_dict.get)
