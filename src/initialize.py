import sqlite3
from models.Author import Author


# Initializes everything by loading data in memory
def initialize():
    # Create a SQL connection to our SQLite database
    con = sqlite3.connect("src/data/database.sqlite")

    cur = con.cursor()
    create_co_author_graph(cur)


# Creates a co author graph in memory
def create_co_author_graph(cursor):
    # the result of a "cursor.execute" can be iterated over by row
    for row in cursor.execute('SELECT * FROM authors;'):
        # create new author with id and name
        author = Author(row[0], row[1])
        print(author.to_string())
