import json
import math
import language_model as lm
from nltk import *
from nltk.corpus import stopwords
from models.Data import Data
from topic_model import *
import topic_evolution



def compute_index_and_topics():
    loaded_index = dict()
    result_length = dict()
    docs_tokens = dict()    # necessary for LDA/LSA
    gensim_dict = None      # necessary for LDA/LSA
    corpus = None           # necessary for LDA/LSA
    lda_obj = None
    bow = None
    collection_bow = dict()
    total_topics = 8
    limit_id = 1000000
    min_limit = 0

    print("Loading inverted index..")
    try:
        with open('inverted_index.txt', 'r') as file:
            data = file.readlines()
            for line in data:
                line_data = dict(json.loads(line.rstrip()))
                if min_limit <  line_data["id"] < limit_id:
                    loaded_index[line_data["id"]] = line_data["inverted_index"]
                    collection_bow[line_data["id"]] = [words for words, freq in (loaded_index[line_data["id"]]).items()]
            gensim_dict = get_gensim_dict()
            corpus = get_corpus()

    except FileNotFoundError:
        print("No inverted index file yet.. computing")

    with open('inverted_index.txt', 'a') as file:
        flag = False

        for i, paper in Data.papers.items():
            if paper.id not in loaded_index and min_limit< paper.id < limit_id:
                document = [paper.title + "\n" + paper.paper_text]
                inv_index = get_inv_ind(document, docs_tokens, paper.id)
                flag = True
                # write resulting data
                result = {'id': paper.id, 'inverted_index': inv_index}
                json.dump(result, file)
                file.write("\n")
                print("Computing inverted index for", paper.id, "out of", len(Data.papers))

        if flag and docs_tokens:
            bow = filter_tokens(docs_tokens)
            save_gensim_dict(bow)

    print("Loaded inverted index")

    print("Reconstructing inv index")
    final_index = {}
    for paper_id, index in loaded_index.items():
        total_occurence = 0
        for word in index:
            if word not in final_index:
                final_index[word] = dict()
            final_index[word][paper_id] = index[word]['0']
            total_occurence = total_occurence + index[word]['0']
            result_length[paper_id] = total_occurence

    Data.inverted_index = final_index
    Data.length = result_length
    print("Reconstructed inv index")

    print("Computing topics")
    # if gensim_dict and corpus retrieved/created
    # do lda modelling
    if corpus and gensim_dict:
        do_lda_modelling(corpus, gensim_dict, total_topics)

    # if lda modelling is not yet done, and all collection bow is read successfully
    # create gensim_dict, corpus and lda based on the file read
    lda_obj = load_ldamodel()
    print("Done Computing Topics")
    if not lda_obj and collection_bow:
        save_gensim_dict(collection_bow)
        gensim_dict = get_gensim_dict()
        corpus = get_corpus()
        do_lda_modelling(corpus, gensim_dict, total_topics)

    if lda_obj:
        if bow: # if the docs are just indexed - bow should not be empty
            # doc_bow = [doc_words for docId, doc_words in bow.items()]
            gensim_dict = get_gensim_dict()
            for docId, doc_words in bow.items():
                doc = gensim_dict.doc2bow(doc_words)
        elif collection_bow:
            matrix_result = dict()
            # for key, value in collection_bow.items():
            #     print(collection_bow)
            for docId, doc_words in collection_bow.items():
                doc = gensim_dict.doc2bow(doc_words)
                Data.papers[docId].topic = label_doc(lda_obj[doc])
                matrix_result[docId] = lda_obj[doc]

    print("Calculating Graph")
    evaluate_graph(corpus, gensim_dict, limit=30)
    topic_evolution.save_csv_topics(total_topics)
    print("Done computing topics")


# Calculating the term frequency for a single document
def get_tf(document):
    tf = {}
    tokenized_words = document.replace(',', '')
    tokenized_document = RegexpTokenizer(r'\w+').tokenize(tokenized_words.lower())
    filtered_words = [word for word in tokenized_document if word not in stopwords.words('english')]

    for j in filtered_words:
        if j in tf:
            tf[j] += 1
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
def get_inv_ind(papers, docs_tokens, paper_id):
    inverted_index = {}
    for i, document in enumerate(papers):
        tokenized_words = document.replace(',', '')
        tokenized_paper = RegexpTokenizer(r'\w+').tokenize(tokenized_words.lower())
        filtered_words = [word for word in tokenized_paper if word not in stopwords.words('english')]
        docs_tokens[paper_id] = filtered_words  # necessary for LDA/LSA

        for j in filtered_words:
            if j in inverted_index:
                if i in inverted_index[j]:
                    inverted_index[j][i] += 1
                    # if inverted_index[j] not in docs_tokens[paper_id]:
                    #     only words with frequency highger than 1
                    # docs_tokens[paper_id].append(inverted_index[j])
                else:
                    inverted_index[j][i] = 1
            # for word, freq in words_freq_collection:
            #     if j in word:

            else:
                inverted_index[j] = {i: 1}
    # list_words(docs_tokens)
    return inverted_index


# Simple idf calculation with normalization
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
    result = list()

    for term in q.split():
        term = term.lower()
        if term in idx:
            collection_frequency = 0
            for doc in idx[term]:
                collection_frequency = collection_frequency + idx[term][doc]
                doc_freq_term = idx[term][doc]
                doc_len = Data.length[doc]
                LMscore[doc] = (lm.GetScoreLM(collection_frequency, doc_freq_term, doc_len, collection_len)) * 100

    for x in [[r[0], r[1]] for r in zip(LMscore.keys(), LMscore.values())]:
        if x[1] > 0:
            result.append([x[1], x[0]])

    sorted_result = sorted(result, key=lambda t: t[0] * -1)
    return sorted_result


result = []


def get_total_length():
    total = 0
    for paper_id, length_paper in Data.length.items():
        total = total + Data.length[paper_id]
    return total
