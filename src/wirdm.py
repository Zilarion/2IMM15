from flask import Flask

# set the project root directory as the static folder, you can set others.
app = Flask(__name__)


@app.route('/query')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()