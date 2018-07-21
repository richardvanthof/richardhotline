from flask import Flask, render_template, request

app = Flask(__name__)

app.debug = True

@app.route("/")
def new():
    return render_template('home.html')

@app.route("/print")
def print_server():
    #GET DATA FROM WEBHOOKS
    content = request.args

    name = str(content.get('name'))
    contact = str(content.get('contact'))
    message = str(content.get('''message'''))

    return """
    PARSED DATA: name: %s, 
    contact: %s, message: 
    %s""" % (name, contact, message)
    

if __name__ == '__main__':
	app.run(debug=True)