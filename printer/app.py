#!/usr/bin/python3

# Import dependencies web server
from flask import Flask, render_template, request, jsonify, make_response, abort
import datetime, sched, time, threading

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
    # Deletes all messages in memory and downloads newst batch from server
    del messages[:]
    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where(u'printed', u'==', False).order_by(u'timestamp')

    try:
        docs = db_ref.get()
        for doc in docs:
            messages.append([doc.id, doc.to_dict()])
        print messages
        return True
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



def fetch():
    while(messages <= 0):
        get_data()
    while(messages > 0):
        try:
            handle_incomming_messages()
        except:
            fetch();



def init():
    try:
        handle_incomming_messages()
    except:
        get_data()



@app.route("/")
def new():
    return '''
        <style>
            ul {
                diplay: inline;
                padding: 1em 0;
                margin: 0;

            }
            li, a {
                display: inline;
                padding: 1em;
                color: black;
                text-decoration: none;
                border-radius: 100rem;
            }
            li {
                margin-right: 0.5em;
                transition: 0.05s ease;
                background-color: rgba(0,0,0,0.05);
                box-shadow: 0em 0em rgba(0,0,0,0);
            }

            li:hover {
                background-color: aquamarine;
                box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.05);
            }
            h2 {
                margin-left: 0.35em
            }
        </style>
        <div style="padding: 5em; max-width: 75em">
        <h1 style="color: rgba(0,0,0,0.8); font-size: 10em; line-height: 0.66em">Sucessfully connected to the Print server!</h1>
        <h2>What would you like to do?</h2>
        <ul>
            <li><a href="/getmessages">Start Print Server</a></li>
            <!--<li><a href="/settings">Settings</a></li>-->
            <li><a href="/status">View Print que</a></li>
            <li><a href="/reset">Reset 'printed' status</a></li>
            <li><a href="/api/getmessages">Test Print</a></li>
        </ul>
        </div>

    '''

@app.route("/status")
def display_status():
    table = "no documents"
    get_data()
    table = """
        <h1 style="width: 95%; display: inline-block">Print Que</h1><a style="display: inline-block" href="/">[Back]</a>
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

@app.route("/settings")
def settings():
    return "Feature not yet available"

@app.route("/getmessages")
def handle():
    if(handle_incomming_messages()):
        return 'done'




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
    # Get target location
    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where(u'printed', u'==', True)
    # Place where all post can be temporarily stored locally
    allPosts = []

    def get_messages():
        try:
            # Get all posts
            docs = db_ref.get()
            for doc in docs:
                #Add post name (ID) and contents to allPosts
                allPosts.append([doc.id, doc.to_dict()])
            return True
        except:
            print 'No such document found'
            return False


    def update_messages():

        print("updating started")
        try:
            for post in allPosts:
                print("updating "+ str(post[0]))
                doc_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').document(str(post[0]))
                doc_ref.update({
                    'printed': False
                })
            return True
        except:
            return False

    success_prompt = '''
        <h1>Message reset Successful</h1>
        <p>Message states for all messages has been reset to 'False'.
        These messages can now be reused for printer testing</p>
        <a href="/">[Back]</a>
        <a href="/status">[Print Que]</a>
        <a href="/getmessages">[Start Print Server]</a>
    '''

    if(get_messages()):
        if(update_messages()):
            print("Update Finished")
            return success_prompt
        else:
            return "Updating failed"
    else:
        return "Getting messages failed"







if __name__ == '__main__':
    app.run(host='0.0.0.0')
