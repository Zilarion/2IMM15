from models.Data import Data


def compute_influence():
    for i, paper in Data.papers.items():
        # find number of times paper title is present in NIPS data base
        nrOfCitations = find_citation(paper.title)

        # write to text file paper id + number of times the title occurs in data base
        with open('paper_influence.txt', 'a') as text_file:
            print(paper.id, " ", nrOfCitations, file = text_file)
            text_file.close()


def find_citation(title):
    nrOfCitations = 0

    for i, paper in Data.papers.items():
        document = paper.paper_text
        document = document.replace('\n', ' ')

        # find the match in document
        if title in document:
            nrOfCitations = nrOfCitations + 1

    return nrOfCitations


def compute_author_influence():
    # compute influence for each author in the database
    for i, author in Data.authors.items():
        influence_value = find_paper_influence(author)

        with open('author_influence.txt', 'a') as text_file:
            print(author.id, influence_value, file = text_file)
            text_file.close()


def find_paper_influence(author):
    # get the set of papers written by the author
    papers = author.papers

    # add all paper influences of the papers written by the author
    influence_value = 0

    for paper in papers:
        influence_value = influence_value + paper.influence

    # relative value for the author influence
    influence_value = influence_value / len(papers)

    return influence_value

