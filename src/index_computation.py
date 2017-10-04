import json
import math
from nltk import *
from nltk.corpus import stopwords
from models.Data import Data


def compute_index():
    loaded_index = dict()
    try:
        with open('inverted_index.txt', 'r') as file:
            data = file.readlines()
            for line in data:
                line_data = dict(json.loads(line.rstrip()))
                loaded_index[line_data["id"]] = line_data["inverted_index"]
    except FileNotFoundError:
        print("No inverted index file yet.. computing")

    with open('inverted_index.txt', 'a') as file:
        for i, paper in Data.papers.items():
            if paper.id not in loaded_index:
                document = [paper.title + "\n" + paper.paper_text]
                inv_index = get_inv_ind(document)

                # write resulting data
                result = {'id': paper.id, 'inverted_index': inv_index}
                json.dump(result, file)
                file.write("\n")
                print("Computing II for", paper.id, "/", len(Data.papers))


# Calculating the term frequency for a single document
def get_tf(document):
    tf = {}
    tokenized_words = document.replace(',','')
    tokenized_document = RegexpTokenizer(r'\w+').tokenize(tokenized_words.lower())
    filtered_words = [word for word in tokenized_document if word not in stopwords.words('english')]
    for j in filtered_words:
        if j in tf:
            tf[j] +=1
        else:
            tf[j] = 1
    return tf


# Calculating the Document term frequency per document combined
def get_document_tf(papers):
    doc_term_freq = {}
    for i, document in enumerate(papers):
        doc = papers[i][0]
        doc_term_freq[i] = get_tf(doc)
    return doc_term_freq


# Creating the inverted index for tf_idf
def get_inv_ind(papers):
    inverted_index = {}
    for i, document in enumerate(papers):
        tokenized_words = document.replace(',', '')
        tokenized_paper = RegexpTokenizer(r'\w+').tokenize(tokenized_words.lower())
        filtered_words = [word for word in tokenized_paper if word not in stopwords.words('english')]
        for j in filtered_words:
            if j in inverted_index:
                if i in inverted_index[j]:
                    inverted_index[j][i] += 1
                else:
                    inverted_index[j][i] = 1
            else:
                inverted_index[j] = {i:1}
    return inverted_index


# Simple idf calculation
def idf(term, idx, n):
    return math.log(1 + (float(n) / len(idx[term])))


def query(q, idx, n):
    score = {}
    for term in q.split():
        term = term.lower()
        if term in idx:
            i = idf(term, idx, n)
            for doc in idx[term]:
                score[doc] = idx[term][doc] * i

    result = []

    for x in [[r[0], r[1]] for r in zip(score.keys(), score.values())]:
        if x[1] > 0:
            result.append([x[1], x[0]+1])

    sorted_result = sorted(result, key=lambda t: t[0] * -1)

    return sorted_result


#print_results(results,10)

#for k, v in idx.items():
#    print(k, v)

#print(set(idx['D']).intersection(set(idx['exists'])).intersection(set(idx['Source'])))

#get_tf(papers)
#dtf = get_document_tf(papers)


