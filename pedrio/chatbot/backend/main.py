from flask import Flask, redirect, url_for, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/',methods = ['POST', 'GET'])
def chat():
    if request.method == 'POST':
        # res = request.args.get('content')
        # print(res)
        return "POST"
    else:
        return "GET Request"
@app.route('/api',methods = ['POST', 'GET'])
def message():
    if request.method == 'POST':
        res = request.json
        res1 = res[0]
        content = res1.get('content')
        print(content)
        return content
    else:
        return "GET Request"

if __name__ == '__main__':
   app.run(debug = True)