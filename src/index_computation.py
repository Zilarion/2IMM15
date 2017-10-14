import json
import math
import language_model as lm

from nltk import *
from nltk.corpus import stopwords
from models.Data import Data


def compute_index():
    loaded_index = dict()
    result_length = dict()

    limit_id = 500
    try:
        with open('inverted_index.txt', 'r') as file:
            data = file.readlines()
            for line in data:
                line_data = dict(json.loads(line.rstrip()))
                if line_data["id"] < limit_id:
                    loaded_index[line_data["id"]] = line_data["inverted_index"]
    except FileNotFoundError:
        print("No inverted index file yet.. computing")

    with open('inverted_index.txt', 'a') as file:
        for i, paper in Data.papers.items():
            if paper.id not in loaded_index and paper.id < limit_id:
                document = [paper.title + "\n" + paper.paper_text]
                inv_index = get_inv_ind(document)

                # write resulting data
                result = {'id': paper.id, 'inverted_index': inv_index}
                json.dump(result, file)
                file.write("\n")
                print("Computing inverted index for", paper.id, "out of", len(Data.papers))

    print("Reconstructing inv index")
    final_index = {}
    for paper_id, index in loaded_index.items():
        total_occurence = 0
        for word in index:
            if word not in final_index:
                final_index[word] = dict()
            final_index[word][paper_id] = index[word]['0']
            print("{paper_id} is ...".format(paper_id=paper_id))
            total_occurence = total_occurence + index[word]['0']
            result_length[paper_id] = total_occurence
    Data.inverted_index = final_index
    Data.length = result_length
    print("Reconstructing inv index")

# Calculating the term frequency for a single document
def get_tf(document):
    tf = {}
    tokenized_words = document.replace(',', '')
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
            result.append([x[1], x[0]])

    sorted_result = sorted(result, key=lambda t: t[0] * -1)

    return sorted_result

def queryLM(q, idx, n):
    LMscore = {}
    collection_len = get_total_length()

    for term in q.split():
        term = term.lower()
        if term in idx:
            collection_frequency = 0;
            for doc in idx[term]:
                collection_frequency = collection_frequency + idx[term][doc]
                doc_freq_term = idx[term][doc]
                doc_len = Data.length[doc]
                LMscore[doc] = (lm.GetScoreLM(collection_frequency, doc_freq_term, doc_len, collection_len))*100

    result = []

    for x in [[r[0], r[1]] for r in zip(LMscore.keys(), LMscore.values())]:
        if x[1] > 0:
            result.append([x[1], x[0]])

    sorted_result = sorted(result, key=lambda t: t[0] * -1)

    return sorted_result

def get_total_length():
    total = 0
    for paper_id, length_paper in Data.length.items():
        total = total + Data.length[paper_id]
    return total
#print_results(results,10)

#for k, v in idx.items():
#    print(k, v)

#print(set(idx['D']).intersection(set(idx['exists'])).intersection(set(idx['Source'])))

#get_tf(papers)
#dtf = get_document_tf(papers)


