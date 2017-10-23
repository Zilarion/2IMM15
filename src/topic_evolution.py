from models.Data import Data
import numpy as np
import pandas as pd
import os
import csv

TEMP_FOLDER = os.path.join(os.path.sep, os.getcwd(), 'temp/')


def save_csv_topics(total_topics):
    file = os.path.join(TEMP_FOLDER, 'topic_evol.csv')
    fieldnames = ['year', 'topic', 'total_papers']

    # rewrite old file
    with open(file, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
    for year in range(1987, 2017):
        data = calculate_total_per_year(Data.papers, total_topics, year)

        for topId, papernr in data.items():
            save_csv_data(year, topId, papernr)
            # stacked_barplot()


def calculate_total_per_year(papers_topic_label, total_topics, year):
    total = list()
    results = dict()
    paper_year = get_docid_per_year(year)

    for topic_id in range(0, total_topics):
        total = [doc_id for doc_id, paper in papers_topic_label.items() if paper.topic == topic_id
                 and doc_id in paper_year]
        results[topic_id] = len(total)
    return results


def get_docid_per_year(year):
    papers_year = list()
    for paper_id, paper in Data.papers.items():
        if paper.year == year:
            papers_year.append(paper_id)
    return papers_year


def save_csv_data(year, topic, total_papers):
    file = os.path.join(TEMP_FOLDER, 'topic_evol.csv')
    fieldnames = ['year', 'topic', 'total_papers']

    try:
        with open(file, 'a', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerow({'year': year, 'topic': topic, 'total_papers': total_papers})
    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)


def stacked_barplot(do_plot=False):
    file = os.path.join(TEMP_FOLDER, 'topic_evol.csv')
    df = pd.read_csv(file)
    df.year = df['year']
    df.tp = df['total_papers']
    df.topic = df['topic']

    width = 0.5  # the width of the bars: can also be len(x) sequence
    q0 = df.query('topic == 0')
    q1 = df.query('topic == 1')
    q2 = df.query('topic == 2')
    q3 = df.query('topic == 3')
    q4 = df.query('topic == 4')
    q5 = df.query('topic == 5')
    q6 = df.query('topic == 6')
    q7 = df.query('topic == 7')

    q0_papers = df.query('topic == 0')['total_papers']
    q1_papers = df.query('topic == 1')['total_papers']
    q2_papers = df.query('topic == 2')['total_papers']
    q3_papers = df.query('topic == 3')['total_papers']
    q4_papers = df.query('topic == 4')['total_papers']
    q5_papers = df.query('topic == 5')['total_papers']
    q6_papers = df.query('topic == 6')['total_papers']
    q7_papers = df.query('topic == 7')['total_papers']


    if do_plot:
        import seaborn as sns
        import matplotlib.pyplot as plt

        pal = sns.color_palette("Set2", 8)
        po = plt.bar(q0['year'], q0_papers, width, color=pal[0])
        p1 = plt.bar(q1['year'], q1_papers, width, bottom=q0_papers, color=pal[1])
        p2 = plt.bar(q2['year'], q2_papers, width, bottom=np.array(q0_papers) + np.array(q1_papers), color=pal[2])
        p3 = plt.bar(q3['year'], q3['total_papers'], width,
                     bottom=np.array(q0_papers) + np.array(q1_papers) + np.array(q2_papers), color=pal[3])
        p4 = plt.bar(q4['year'], q4_papers, width, bottom=np.array(q0_papers) + np.array(q1_papers) + np.array(q2_papers) +
                                                          np.array(q3_papers), color=pal[4])
        p5 = plt.bar(q5['year'], q5_papers, width,
                     bottom=np.array(q0_papers) + np.array(q1_papers) + np.array(q2_papers) +
                            np.array(q3_papers) + np.array(q4_papers), color=pal[5])
        p6 = plt.bar(q6['year'], q6_papers, width,
                     bottom=np.array(q0_papers) + np.array(q1_papers) + np.array(q2_papers) +
                            np.array(q3_papers) + np.array(q4_papers) + np.array(q5_papers), color=pal[6])
        p7 = plt.bar(q7['year'], q7_papers, width,
                     bottom=np.array(q0_papers) + np.array(q1_papers) + np.array(q2_papers) +
                            np.array(q3_papers) + np.array(q4_papers) + np.array(q5_papers) + np.array(q6_papers),
                     color=pal[7])

        plt.ylabel('Total Papers')
        plt.title('Papers per topic')
        plt.legend((po[0], p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p7[0]),
                   ('Topic 0', 'Topic 1', 'Topic 2', 'Topic 3', 'Topic 4',
                    'Topic 5', 'Topic 6', 'Topic 7'))

        plt.show()


def stacked_area(do_plot=False):
    file = os.path.join(TEMP_FOLDER, 'topic_evol.csv')
    df = pd.read_csv(file)
    df.year = df['year']
    df.tp = df['total_papers']
    df.topic = df['topic']

    q0 = df.query('topic == 0')
    q1 = df.query('topic == 1')
    q2 = df.query('topic == 2')
    q3 = df.query('topic == 3')
    q4 = df.query('topic == 4')
    q5 = df.query('topic == 5')
    q6 = df.query('topic == 6')
    q7 = df.query('topic == 7')

    q0_papers = df.query('topic == 0')['total_papers']
    q1_papers = df.query('topic == 1')['total_papers']
    q2_papers = df.query('topic == 2')['total_papers']
    q3_papers = df.query('topic == 3')['total_papers']
    q4_papers = df.query('topic == 4')['total_papers']
    q5_papers = df.query('topic == 5')['total_papers']
    q6_papers = df.query('topic == 6')['total_papers']
    q7_papers = df.query('topic == 7')['total_papers']

    year = q0['year']
    if do_plot:
        import seaborn as sns
        import matplotlib.pyplot as plt

        pal = sns.color_palette("Set2", 8)
        plt.stackplot(year, q0_papers, q1_papers, q2_papers, q3_papers,
                      q4_papers, q5_papers, q6_papers, q7_papers, colors=pal, labels=['Topic 0',
                                                                                      'Topic 1', 'Topic 2', 'Topic 3',
                                                                                      'Topic 4',
                                                                                      'Topic 5', 'Topic 6', 'Topic 7'])

        plt.ylabel('Total Papers')
        plt.title('Papers per topic')
        plt.legend(loc='upper left')
        plt.show()
