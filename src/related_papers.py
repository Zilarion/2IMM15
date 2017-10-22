from models.Data import Data
import json


def compute_related_papers():
    related_papers = dict()
    print("Computing related papers.")
    try:
        with open('related_papers.txt', 'r') as file:
            data = file.readlines()
            for line in data:
                line_data = dict(json.loads(line.rstrip()))
                related_papers[line_data["id"]] = set(line_data["related"])
    except FileNotFoundError:
        print("No related papers file yet. Creating a new one!")

    with open('related_papers.txt', 'a') as file:
        for i1, p1 in Data.papers.items():
            # Already loaded
            if p1.id in related_papers:
                for paper_id in related_papers[p1.id]:
                    p1.related_papers.add(Data.papers[paper_id])
                continue

            # Compute, not in file yet
            related_to_p1 = []
            for i2, p2 in Data.papers.items():
                if p1.id == p2.id:
                    continue
                if are_related(p1, p2):
                    related_to_p1.append(p2.id)

            result = {'id': p1.id, 'related': related_to_p1}
            json.dump(result, file)
            file.write("\n")
    print("Related papers loaded!")


def are_related(p1, p2):
    if p1.topic == p2.topic and p1 is not None:
        return True
    for a1 in p1.authors:
        for a2 in p2.authors:
            if Data.authors[a1].cluster == Data.authors[a2].cluster and Data.authors[a1].cluster is not None:
                return True
    return False
