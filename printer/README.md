![picture of a thermal printer](https://github.com/RichART-Official/richardhotline/blob/master/printer/static/img/hotline-preview.png)

# The Richard Hotline

## A machine that prints important messages in right front of my face

Since I'm not really prone to look at my phone, people often can't reach me. This often creates a lot of frustration for whemever want's my attention. To solve this I want by making the messages something fysical in my workspace. Something I can't simply 'swipe away.' Inspired by [Thinkernut's Alexa Printer](https://www.hackster.io/tinkernut/cheap-alexa-printer-from-an-old-receipt-printer-c14ea2) am I going to do this by placing a thermal printer (like you print receipts with) on my desk to which people who really need my attention can send a message. They can do this by going to a special super secret URL (aka a subdomain on my future website). After submitting, a receipt with the name, message, timestamp and preferred reaction method (i.e. phone, mail, Whatsapp).

### Goals

- Designing front-end for writers,
- Make printer print mesages and personal information in a pre-specified format.
- Save all messages in a database
- Maybe Pushbullet integration to get an alert when I'm away from my hotline.

### Dependencies

- Python 3
- Flask
- python-escpos
- Firebase

### Start Print Server

<code>FLASK_APP=app.py FLASK_DEBUG=1 python3 -m flask run</code>

### REST API

To send messages to the printer with the REST API.
path: <code>[YOUR DOMAIN]/print/api/message</code>
This should be done in a json format. These are the accepted values:
- name: string (mandatory)
- contact: string
- date: timestamp
- message: string
- printed: boolean

### Authentification Firebase
This project makes use of the Firebase API. Authenthicate your request by creating a service account in the Firebase console and adding the private key to ./printer/utils/ as serviceAccountKey.json. For obvious reasons the secret key is not stored in this repository and has to be added every time the project is set up.

### Troubleshooting

when executing the print server, I get the following message:

<code> RuntimeError: Click will abort further execution because Python 3 was configured to use ASCII as encoding for the environment.</code>
Run the following commands:

<code>
	export LC_ALL=C.UTF-8
    export LANG=C.UTF-8
</code>

<code>ImportError: libtiff.so.5: cannot open shared object file: No such file or directory</code>
Install libtiff5 <code>sudo apt install libtiff5</code>

<code>usb.core.USBError: [Errno 13] Access denied (insufficient permissions)</code> Of course you can run in sudo-mode by using: <code>sudo python3 -m flask run --host=0.0.0.0</code>. Of course this is not ideal. Solution:

1. <code>sudo nano /etc/udev/rules.d/99-com.rules</code>
2. add the following line: <code>SUBSYSTEM=="usb", ATTR{idVendor}=="0416", ATTR{idProduct}=="5011", MODE="777"</code>

**When Google Cloud throws authentification error, explicitly set the path to your serviceAccountKey.json with the following command:*
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/utils/serviceAccountKey.json"
```
