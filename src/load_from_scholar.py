from models.Data import Data


def get_documents():
    # Get the title name of the documents
    documents = []
    for i, paper in Data.papers.items():
        documents.append(paper.title)
        if i > 10:
            break
    Data.citations = get_citations(documents)

    print("Done")

# Get the number of citations of each article based on title names
def get_citations():
    citations = {}


    return citations