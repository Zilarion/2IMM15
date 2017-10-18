from models.Data import Data


def compute_author_influence():
    dict = get_paper_influence()

    # compute influence for each author in the database
    for i, author in Data.authors.items():
        influence_value = find_paper_influence(author, dict)

        with open('author_influence.txt', 'a') as text_file:
            print(author.id, influence_value, file = text_file)
            text_file.close()


def find_paper_influence(author, dict):
    # get the set of papers written by the author
    papers = author.papers

    # add all paper influences of the papers written by the author
    influence_value = 0

    for paper in papers:
        influence_value = influence_value + dict.get(paper)

    # relative value for the author influence
    influence_value = influence_value / len(papers)

    return influence_value

def get_paper_influence():
    dict = {}

    with open("paper_influence.txt") as text_file:
        for line in text_file:
            (key, val) = line.split()
            dict[int(key)] = int(val)

    return dict





