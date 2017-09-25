from flask import Flask

from initialize import initialize

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='', static_folder='../public')
initialize()


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/query')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)
