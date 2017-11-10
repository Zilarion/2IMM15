from models.Data import Data


def determine_topics():
    for i, author in Data.authors.items():
        papers_written = author.papers

        for paper_id in papers_written:
            # add topic of paper to the topics of the author if not already present
            if Data.papers[paper_id].topic not in author.topics:
                author.topics.add(Data.papers[paper_id].topic)
