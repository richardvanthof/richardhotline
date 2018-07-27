from flask import Flask, render_template, request
from escpos.printer import Usb

app = Flask(__name__)
p = Usb(0x0416, 0x5011)

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

    body = "PARSED DATA: name: %s, contact: %s, message: %s" % (name, contact, message)
    p.text(body)

    return render_template('sucess.html')