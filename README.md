![picture of a thermal printer](https://github.com/RichART-Official/richardhotline/blob/master/static/img/hotline-preview.png)
# The Richard Hotline
## A machine that prints imortant messages in right front of my face
Since I'm not really prone to look at my phone, people often can't reach me. This often creates a lot of frustration for whemever want's my attention. To solve this I want by making the messages something fysical in my workspace. Something I can't simply 'swipe away.' Inspired by [Thinkernut's Alexa Printer](https://www.hackster.io/tinkernut/cheap-alexa-printer-from-an-old-receipt-printer-c14ea2) am I going to do this by placing a thermal printer (like you print receipts with) on my desk to which people who really need my attention can send a message. They can do this by going to a special super secret URL (aka a subdomain on my future website). After submitting, a receipt with the name, message, timestamp and preferred reaction method (i.e. phone, mail, Whatsapp).
### Goals
- Designing front-end for writers,
- Make printer print mesages and personal information in a pre-specified format.
- Save all messages in a database
- Maybe Pushbullet integration to get an alert when I'm away from my hotline.
### Dependencies
- Flask
- WTforms
- python-escpos
