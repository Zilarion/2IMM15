from flask import Flask
from flask import redirect
from flask import request

import query_handler
from initialize import initialize

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='', static_folder='../public')
initialize()


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/query', methods=['POST'])
def new_query():
    content = request.get_json()
    print(content)
    return query_handler.handle_query(content)


@app.errorhandler(404)
def page_not_found(e):
    return redirect("/", code=302)

if __name__ == '__main__':
    app.run(debug=True)
