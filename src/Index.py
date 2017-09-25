# Inverted Index
Database = 'C:/Users/s166027/Desktop/School/Web information retrieval and data mining/SQLite/nips-papers/database.sqlite'

#Database Connection
import sqlite3
import math
import numpy
import nltk
import operator
from nltk import *
from nltk.tokenize import BlanklineTokenizer
from nltk.corpus import stopwords
import time

#Initializing Variables
start_time = time.time()
Tokenized_papers = []
Tokenized_words = []
inverted_index = {}
tf = {}
doc_term_freq = {}
doc = []
tokenizer = BlanklineTokenizer()
cur = sqlite3.connect(database=Database).cursor().execute("select paper_text from papers where id between 1 and 2")
papers = cur.fetchall()

#Calculating the term frequency for a single document
def get_tf(document):
    Tokenized_words = document.replace(',','')
    Tokenized_document = RegexpTokenizer(r'\w+').tokenize(Tokenized_words)
    filtered_words = [word for word in Tokenized_document if word not in stopwords.words('english')]
    for j in filtered_words:
        if j in tf:
            tf[j] +=1
        else:
            tf[j] = 1
    return tf
#Calculating the Document term frequency per document combined
def get_document_tf(papers):
    for i, document in enumerate(papers):
        doc = papers[i][0]
        doc_term_freq[i] = get_tf(doc)
    return doc_term_freq

#Creating the inverted index for tf_idf
def get_inv_ind(papers):
    for i, document in enumerate(papers):
        Tokenized_words = document.replace(',', '')
        Tokenized_paper = RegexpTokenizer(r'\w+').tokenize(Tokenized_words)
        filtered_words = [word for word in Tokenized_paper if word not in stopwords.words('english')]
        for j in filtered_words:
            if j in inverted_index:
                if i in inverted_index[j]:
                    inverted_index[j][i] += 1
                else:
                    inverted_index[j][i] = 1
            else:
                inverted_index[j] = {i:1}
    return inverted_index

#Simple idf calculation
def idf(term, idx, n):
    return math.log(1 + (float(n) / len(idx[term])))


def query(query, idx=inverted_index, n=len(doc)):
    score={}
    for term in query.split():
        if term in idx:
            i = idf(term, idx, n)
            for doc in idx[term]:
                score[doc] = idx[term][doc] * i

    result = []

    for x in [[r[0],r[1]] for r in zip(score.keys(), score.values())]:
        if x[1] > 0:
            result.append([x[1],x[0]+1])

    sorted_result = sorted(result, key=lambda t:t[0] * -1)

    return sorted_result

i=0
while i < len(papers):
    doc.append(papers[i][0])
    i += 1



inverted_index = get_inv_ind(doc)

results = query('Learning', inverted_index, len(doc))

for i in results:
    print(i)


print("--- %s seconds ---" % (time.time() - start_time))

#print_results(results,10)

#for k, v in idx.items():
#    print(k, v)

#print(set(idx['D']).intersection(set(idx['exists'])).intersection(set(idx['Source'])))

#get_tf(papers)
#dtf = get_document_tf(papers)


