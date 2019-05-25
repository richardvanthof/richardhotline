#!/usr/bin/python3

# Import dependencies web server
from flask import Flask, render_template, request, jsonify, make_response, abort
import datetime

# Import dependencies receipt printer
from escpos.printer import Usb, Dummy

import os
import google.auth
from google.cloud import firestore
from google.oauth2 import service_account

key ='./utils/serviceAccountKey.json'

credentials = service_account.Credentials.from_service_account_file(key)
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/cloud-platform'])

credential_path = key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path


# If no other instances of firebase are running, Firebase gets initialised.
# Here the authenticaton object (cred) is also applied (don't forget to add this before runnning this program)
# db = ""
# app = ""

# if not len(firebase_admin._apps):
#   cred = credentials.Certificate("./utils/serviceAccountKey.json")
#   app = firebase_admin.initialize_app(cred)
#   db = firestore.Client(credentials=cred)


messages = []


app = Flask(__name__)

def init_printer():
    try:
        return Usb(0x0416, 0x5011)
    except:
        print("NO PRINTER DETECTED. Dummy printer is being used instead.")
        print("If this is an error: please check the USB-cable")
        return Dummy()

p = init_printer()


app.debug = True

def get_data():
    db = firestore.Client(credentials=credentials)
    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where(u'printed', u'==', False)

    try:
        docs = db_ref.get()
        for doc in docs:
            messages.append([doc.id, doc.to_dict()])
    except google.cloud.exceptions.NotFound:
        print 'No such document found'
        return "failed"

def print_message(data):

    timestamp = str(data.get('date'))
    name = str(data.get('name'))
    contact = str(data.get('contact'))
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
    return '''
        <h3 style="line-height: 0.9em; font-size: 3rem">Sucessfully connected to the Print server!</h3>
        <p>Part of the Richard Hotline project by Richard van 't Hof</p>
    '''

@app.route("/status")
def display_status():
    table = "no documents"
    get_data()
    table = """
        <table style="width: 100%; text-align: left">
            <tr>
                <th>ID</th>
                <th>From</th>
                <th>Contact</th>
                <th>Timestamp</th>
                <th>Message</th>
            </tr>
            """+get_rows(messages)+"""
        </table>
    """
    return table

def get_rows(posts):
    rows = []
    table = ""

    for message in posts:
        rows.append("""
            <tr>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
            </tr>
            """.format(
                message[0],
                message[1].get('name'),
                message[1].get('contact'),
                message[1].get('timestamp'),
                message[1].get('message')

            )
        )
    return(" ".join(rows))

@app.route("/api/print",  methods=['POST'])
def post_messages():
    if not request.get_json or not 'message' in request.json:
        abort(400)
    content = request.get_json()
    print_message(content)
    return "Message sent", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
