// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const sanitizeHtml = require('sanitize-html');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

const cors = require('cors')({origin: true});

const config = {
    maxLength: {
        textField: 50,
        textArea: 400
    }
}

const length = (string) => {
    return string.length;
}

const isValid = (data) => {
    return new Promise((resolve, reject)=>{
        try {
            // Verifies if input is filled in
            if(length(data.name) <= 0 || length(data.contact) <= 0
                || length(data.message) <= 0){
                throw new functions.https.HttpsError('invalid-argument',"", 'Please, fill in all the fields')
            }
            if( length(data.name) > config.maxLength.textField ||
                length(data.contact) > config.maxLength.textField){
                throw new functions.https.HttpsError('invalid-argument',"", "No name, email or phone number should be that long! Make them shorter, you hacker :)")
                }
            // Checks if input has no more charakters than specified in this.maxLength
            if( length(data.message) > config.maxLength.textArea){
                throw new functions.https.HttpsError('invalid-argument',"", "Please, make your message shorter")
            }
            if( length(data.message) > config.maxLength.textArea){
                throw new functions.https.HttpsError('invalid-argument',"", "Please, make your message shorter")
            }
            resolve();
        } catch(err) {
            // console.log(err);
            reject(err);
        }
    })

}


let sanitize = (data) => {
    // Get all message data and make JSON.
    let post = {
        name: sanitizeHtml(data.name),
        contact: sanitizeHtml(data.contact),
        message: sanitizeHtml(data.message),
        timestamp: data.timestamp,
        printed: data.printed
    }
    return post;
}


// Saves a message to the Firebase Firestore but validates and sanitizes the text first.
exports.addMessage = functions.https.onCall(async (req, res) => {
    const data = req;
    try {
        await isValid(data);
        // console.log(JSON.stringify(data))
        const sanitizedPost = await sanitize(data);
        // console.log(sanitizedPost.timestamp);
        const submit = await db.collection('Users/Richard/Messages').add(sanitizedPost);
        return {
            posted: true,
            id: submit.id
        }
    } catch(err) {
        console.log("SERVER ERROR: "+ err)
        return err
    }
});

