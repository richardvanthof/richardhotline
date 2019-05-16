from flask import Flask, render_template, request, jsonify, make_response, abort
import datetime
from escpos.printer import Usb

app = Flask(__name__)
p = Usb(0x0416, 0x5011)

print_jobs = []
app.debug = True

def print_message(data):

    timestamp = str(data.get('date'))
    name = str(data.get('name'))
    phone = str(data.get('phone'))
    email = str(data.get('email'))
    message = str(data.get('''message'''))

    # body = "PARSED DATA: name: %s, contact: %s, message: %s" % (name, contact, message)
    p.text("""

IMPORTANT MESSAGE:
%s

By: %s

%s


email:
%s

Phone
%s

_______________________________
===============================
"""% (timestamp, name, message, email, phone))

@app.route("/")
def new():
    return render_template('test.html')


@app.route("/api/print",  methods=['POST'])
def post_messages():
    if not request.get_json or not 'message' in request.json:
        abort(400)
    content = request.get_json()
    print_message(content)
    return "Message sent", 200



if __name__ == '__main__':
    app.run(host='0.0.0.0')
