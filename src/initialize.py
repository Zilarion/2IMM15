import sqlite3

from index_computation import compute_index
from models.Author import Author
from models.Paper import Paper
from models.Data import Data


# Initializes everything by loading data in memory
def initialize():
    # Create a SQL connection to our SQLite database
    con = sqlite3.connect("src/data/database.sqlite")

    cur = con.cursor()
    load_models(cur)
    print("Working..")
    compute_index()
    print("Done")

# imports the papers and authors in memory
def load_models(cursor):
    for row in cursor.execute('SELECT * FROM papers'):
        paper = Paper(row[0], row[1], row[2], row[3], row[4], row[5], row[6])
        Data.add_paper(paper)

    for row in cursor.execute('SELECT * FROM authors;'):
        # create new author with id and name
        author = Author(row[0], row[1])
        Data.add_author(author)

    for row in cursor.execute('SELECT * FROM paper_authors'):
        Data.papers[row[1]].add_author(row[2])
        Data.authors[row[2]].add_paper(row[1])

