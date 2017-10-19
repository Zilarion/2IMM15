from models.Data import Data

def compute_related_papers():
    for index, paper in Data.papers.items():
        for index, author in Data.authors.items():
            x = 1
