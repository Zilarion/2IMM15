from flask import Flask
from initialize import initialize

# set the project root directory as the static folder, you can set others.
app = Flask(__name__)
initialize();

@app.route('/query')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()