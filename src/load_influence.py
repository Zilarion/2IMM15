from models.Data import Data


def load_influence():
    print("Loading influence")
    load_paper_influence()
    load_author_influence()
    print("Done loading influence")


def load_paper_influence():
    with open("paper_influence.txt") as text_file:
        for line in text_file:
            (key, val) = line.split()
            Data.papers[int(key)].influence = int(val)

    return dict


def load_author_influence():
    with open("author_influence.txt") as text_file:
        for line in text_file:
            (key, val) = line.split()
            if int(key) in Data.authors:
                Data.authors[int(key)].influence = float(val)

    return dict



