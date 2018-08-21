from flask import Flask, render_template, request, json
import datetime
import json
from escpos.printer import Usb, Dummy

app = Flask(__name__)
# p = Usb(0x0416, 0x5011)
d = Dummy()

app.debug = True
  
}
@app.route("/")
def new():
    return render_template('home.html')

@app.route("/print")
def printJson():
    json.dumps(message, indent=4)
# def print_server():
    
#     #GET DATA FROM WEBHOOKS
#     content = request.args

#     timestamp = datetime.datetime.now()
#     name = str(content.get('name'))
#     phone = str(content.get('phone'))
#     email = str(content.get('email'))
#     message = str(content.get('''message'''))

#     # body = "PARSED DATA: name: %s, contact: %s, message: %s" % (name, contact, message)
#     d.text("""


# IMPORTANT MESSAGE:
# %s

# By: %s

# %s


# email:
# %s

# Phone
# %s

# _______________________________
# ===============================
# """% (timestamp, name, message, email, phone)) 

#     return render_template('sucess.html')