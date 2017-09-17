from flask import Flask, request, send_from_directory

# set the project root directory as the static folder, you can set others.
app = Flask(__name__)

@app.route('/query')
def hello_world():
    return 'Hello, World!'