from flask import Flask, render_template, request

app = Flask(__name__)

app.debug = True

@app.route("/")
def new():
    return render_template('home.html')

@app.route("/print")
def print_server():
    #GET DATA FROM WEBHOOKS
    content = request.form

    #CONVERT DATA TO STRINGS
    str_content = str(content)

    #PRINT DATA
    return 'data: ' + str_content

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')