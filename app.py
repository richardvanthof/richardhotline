from flask import Flask, render_template
app = Flask(__name__)
app.debug = True

@app.route("/")
def new():
    return render_template('home.html')