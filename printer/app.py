#!/usr/bin/python3

# Import OS functions
import os

# Import dependencies web server
from flask import Flask, render_template, request, jsonify, make_response, abort
import datetime, sched, time, threading
import asyncio

# Import dependencies receipt printer
from escpos.printer import *

# Import Google Cloud dependencies for Firebase Firestore
import google.auth
from google.cloud import firestore
from google.oauth2 import service_account

# Authenticate and initialise Google Cloud
key ='./utils/serviceAccountKey.json'
credentials = service_account.Credentials.from_service_account_file(key)
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/cloud-platform'])
credential_path = key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
db = firestore.Client(credentials=credentials)

# Is print server active
isActive = True

# Store to be printed messages here
messages = []

app = Flask(__name__)

# Main functions
# Checks if printer is connected. If not this function will return an error (BUG: build in a right error) that prevents printing.
def detectPrinter():
    # Checks if USB Printer is available. If not, the dummy printer is used.
    try:
        p = Usb(0x0416, 0x5011)
        print("👍   Printer Detected")
        return p
    except:
        print("⚠️  NO PRINTER DETECTED. Skipping message...")
        print("   Please check the USB-cable")
        return False

# Checks if new messages are prescent with a false 'printed' status; if so: they get downloaded and added to the 'messages' list
def getData():
    # print('Fetching...')
    del messages[:]
    db_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').where('printed', '==', False)
    # .where('printed', '==', False).order_by(u'created')
    try:
        docs = db_ref.stream()
        for doc in docs:
            messages.append([doc.id, doc.to_dict()])
            # print("Print que: " + str(messages))

    except google.cloud.exceptions.NotFound:
            print('No such document found in the Database')
    except:
        print("something went wrong")

# Updates the 'printed' status in the database to true
def update_firebase_message(messageID):
    print("☑️   Updating print status %s on server"%(messageID))
    try:
        doc_ref = db.collection(u'Users').document(u'Richard').collection(u'Messages').document(messageID)
        doc_ref.update({
            'printed': True
        })
        return True
    except:
        return "Google Cloud could not be reached"

# Deletes message from the print que
def delete_from_printque(message):
    try:

        messageIndex = messages.index(message)
        messages.remove(messages[messageIndex])
        print("🗑   Deleted %s from print que"%(message[0]))
        return True
    except(Exception):
        print(env)
        return False

# Function that prints the messages from the message contents (data: JS object) to the specified device (device)
async def printMessage(data, device):
    p = device
    created = str(data.get('created'))
    name = str(data.get('name'))
    contact = str(data.get('contact'))
    message = str(data.get('''message'''))
    print("🖨   Printing message from %s"%(name))
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
        """% (created, name, message, contact))
        return True
    except:
        return False

# Main functions that get executed into the event loop
async def main():
    while isActive:
        print("Checking for new messages...")
        mssgCounter = len(messages)
        while(mssgCounter <= 0):
            getData()
            mssgCounter = len(messages)
            # print("Current Que: "+str(messages))
            await asyncio.sleep(1)

        for message in messages:
            #Aliases
            mssgId = message[0]
            mssgContent = message[1]

            #Print loop
            printer = detectPrinter()
            if(printer is not False):
                await printMessage(mssgContent, printer)
                update_firebase_message(mssgId)
                delete_from_printque(message)
                mssgCounter = len(messages)
            else:
                print("""   Pausing print task untill printer is reconnected...
                    """)
                await asyncio.sleep(10)

# Functions to execute when the program initiates
def setup():
    # Clear Terminal Screen
    os.system('cls' if os.name == 'nt' else 'clear')
    print("""
Richard Hotline Print Server
A Project by Richard van 't Hof

""")

# Create event loop that makes the scrips for the print server loop forever.
loop = asyncio.get_event_loop()

setup();
try:
    asyncio.ensure_future(main())
    loop.run_forever()
except KeyboardInterrupt:
    pass
finally:
    print("Closing Loop")
    loop.close()


# GUI debugging tools
# @app.route("/")
# def new():
#     return render_template('start.html')

# @app.route("/settings")
# def settings():
#     return render_template('settings.html')

@app.route("/getmessages")
def handle_incomming_messages():
    getData()
    return "Fetching messages"


@app.route("/status")
def display_status():
    table=""
    getData()
    mssgCount = len(messages)
    if(mssgCount > 0):
        table = """
            <h1 style="width: 95%; display: inline-block">Print Que</h1><a style="display: inline-block" href="/">[Back]</a>
            <table style="width: 100%; text-align: left">
                <tr>

                    <th><h3>ID</h3></th>
                    <th><h3>From</h3></th>
                    <th><h3>Contact</h3></th>
                    <th><h3>Message</h3></th>
                    <th><h3>Timestamp</h3></th>


                </tr>
                """+get_rows(messages)+"""
            </table>
        """
    else:
        table = """
        <h1 style="width: 95%; display: inline-block">Print Que</h1><a style="display: inline-block" href="/">[Back]</a>
            <table style="width: 100%; text-align: left">
                <tr>

                    <th><h3>ID</h3></th>
                    <th><h3>From</h3></th>
                    <th><h3>Contact</h3></th>
                    <th><h3>Message</h3></th>
                    <th><h3>Timestamp</h3></th>


                </tr>
            </table>"""

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
                message[1].get('message'),
                message[1].get('timestamp')
            )
        )
    table = " ".join(rows)
    return(table)
    # while(messages <= 0):
    #     handle_incomming_messages()

    # if(messages.length >= 0):
    #     for message in messages:
    #         if(print_message(message[1])):
    #             mark_message_as_done(message)
    #         else:
    #             print("Error, message "+str(message[0])+" can't be printed. Printer seems unreachable. Please check cable.")
    #             return handle_incomming_messages()
    # return "printing"

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
            print('No such document found')
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






app.debug = True

if __name__ == '__main__':
    app.run(host='0.0.0.0')
