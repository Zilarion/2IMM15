from models.Data import Data


def compute_related_papers():
    for i1, p1 in Data.papers.items():
        for i2, p2 in Data.papers.items():
            if p1.id == p2.id:
                continue

            related = are_related(p1, p2)

            if related:
                p1.related_papers.add(p2.id)
                print(p1.id, p2.id)
        if i1 > 100:
            return
        print(p1.id)


def are_related(p1, p2):
    if p1.topic == p2.topic and p1 is not None:
        for a1 in p1.authors:
            for a2 in p2.authors:
                if Data.authors[a1].cluster == Data.authors[a2].cluster and Data.authors[a1].cluster is not None:
                    return True
    return False
