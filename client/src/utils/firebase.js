import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAGCLXy7wWqz-GC67hDh2nCd1Rc_6DPVGY",
    authDomain: "richardhotline-7e1d2.firebaseapp.com",
    databaseURL: "https://richardhotline-7e1d2.firebaseio.com",
    projectId: "richardhotline-7e1d2",
    storageBucket: "richardhotline-7e1d2.appspot.com",
    messagingSenderId: "709780838816",
    appId: "1:709780838816:web:807c29c8a3ba386f"
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
