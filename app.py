from flask import Flask, render_template
# from escpos.printer import Usb

# p = Usb(0x0416, 0x5011)
app = Flask(__name__)

app.debug = True

@app.route("/")
def new():
    return render_template('home.html')

@app.route("/print")
def print_server():
    return "PRINT SERVER HERE"
    