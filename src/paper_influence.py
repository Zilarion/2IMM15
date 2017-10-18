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


