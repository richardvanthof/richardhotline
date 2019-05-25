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
db = firestore.Client(credentials=credentials)

app.debug = True

def get_data():

    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where(u'printed', u'==', False).order_by(u'timestamp')

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
    try:
        p.text("""

        IMPORTANT MESSAGE:
        %s

        By: %s

        %s


        Contact:
        %s

        _______________________________
        ===============================
        """% (timestamp, name, message, contact))
        return True
    except:
        return False

def mark_message_as_done(message):
    messageID = message[0]
    messageContent = message[1]
    print("Marking message "+str(messageID)+" as done and deleting it from print que")
    if(update_firebase_message(messageID)):
        if(delete_from_printque(message)):
            return True
        else:
            return "Removing message from print que failed"
    else:
        print("Updating Firebase Failed")
        return "Updating Firebase Failed"

def update_firebase_message(messageID):
    try:
        doc_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').document(messageID)
        doc_ref.update({
            'printed': True
        })
        return True
    except:
        return "Google Cloud could not be reached"

def delete_from_printque(message):
    try:
        message_index = messages.index(message)
        messages.remove(messages[message_index])
        print("Message removed");
        return True
    except:
        print("Removing message from print que failed")
        return False

@app.route("/")
def new():
    return '''
        <div style="padding: 5em; max-width: 75em">
        <h1 style="color: rgba(0,0,0,0.8); font-size: 10em; line-height: 0.66em">Sucessfully connected to the Print server!</h1>
        <h2>Part of the Richard Hotline project by Richard van 't Hof</h2>
        <ul>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/status">View Print que</a></li>
            <li><a href="/reset">Reset 'printed' status</a></li>
            <li><a href="/api/getmessages">Test Print</a></li>
            <li><a href="/getmessages">Continuous test print</a></li>
        </ul>
        </div>
    '''

@app.route("/status")
def display_status():
    table = "no documents"
    get_data()
    table = """
        <h1>Print Que</h1>
        <table style="width: 100%; text-align: left">
            <tr>

                <th><h3>ID</h3></th>
                <th><h3>From</h3></th>
                <th><h3>Contact</h3></th>
                <th><h3>Timestamp</h3></th>
                <th><h3>Message</h3></th>

            </tr>
            """+get_rows(messages)+"""
        </table>
    """
    return table



def get_rows(posts):
    rows = []
    table = " "

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
    table = " ".join(rows)
    return(table)

@app.route("/api/getmessages")
def manually_handle_incomming_message():
    get_data()
    for message in messages:
        print_message(message[1])
    return "connected"

@app.route("/settings")
def settings():
    return "Feature not yet available"

@app.route("/getmessages")
def handle_incomming_messages():
    get_data()
    p = init_printer()
    while(messages <= 0):
        handle_incomming_messages()

    if(messages > 0):
        for message in messages:
            if(print_message(message[1])):
                mark_message_as_done(message)
            else:
                print("Error, message "+str(message[0])+" can't be printed. Printer seems unreachable. Please check cable.")
                return handle_incomming_messages()
        return "printing"




@app.route("/api/print",  methods=['POST'])
def post_messages():
    if not request.get_json or not 'message' in request.json:
        abort(400)
    content = request.get_json()
    print_message(content)
    return "Message sent", 200


@app.route("/reset")
# Resets the 'printed' status of all messages to False; should only be used for debugging
def reset_printstatus():
    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where(u'printed', u'==', True)
    allPosts = []
    try:
        docs = db_ref.get()
        for doc in docs:
            allPosts.append([doc.id, doc.to_dict()])
    except google.cloud.exceptions.NotFound:
        print 'No such document found'
        return "failed"

    try:
        for post in allPosts:
            doc_ref = db_ref.document(post[0])
            doc_ref.update({
                'printed': False
            })
        return """
            <h1>Printed status reset</h1>
            <p>The 'printed' status of all messages have been reset to 'False.'</p>
            <a href="/status">[status]</a>
            <a href="/getmessages">[test printer]</a>
        """
    except:
        return EnvironmentError


if __name__ == '__main__':
    app.run(host='0.0.0.0')
