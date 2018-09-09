import React from 'react';
import Keypress from 'react-keypress';
import { TextField, TextArea} from '../components/input';

const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);

export class Message extends React.Component{
    constructor(props) {
        // this.handleSubmit = this.handleSubmit.bind(this);
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
            timestamp: new Date(),
            clientID: "1",
            recipient: "Richard",
        }
        
        this.handleAddField = this.handleAddField.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.docRef = db.doc("Users/" + this.state.recipient + "/Messages/" + this.autoID(10) );
    }
    // Initialize Cloud Firestore through Firebase
    
    handleInput(event) {
        this.setState(
            { [event.target.name] : event.target.value }
        );
    }

    handleSubmit(event){
        console.log("Submitting to" + this.docRef);
        event.preventDefault();
        console.log("Sending message")
        this.docRef.set({
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            date: this.state.timestamp,
            message: this.state.message,
            clientID: this.state.clientID,
            timesPrinted: 0
        }).then(function() {
            console.log("Document successfully written!");
            return () => true;
        }).catch(function(error){
            console.error("Error writing document: " + error);
            return () => false;
        })
    }
    handleAddField(){
        this.setState(
            {fieldCount: this.state.fieldCount + 1}
        )
        
        console.log(this.state.fieldCount);
    }

    autoID(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < length; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        console.log("autoID: "+autoId);
        return autoId;
    }

    generateFields(){
        const fields = [
            {
                type: 'text',
                name: 'name',
                value: this.state.name
            },
            {
                type: 'email',
                name: 'email',
                value: this.state.email
            },
            {
                type: 'tel',
                name: 'phone',
                value: this.state.phone
            },
        ];
        return fields.map((field, count) => (
            <TextField
                key={ `input-${count}` }
                type={ field.type }
                name={ field.name }
                value={ field.value }
                onChange={ this.handleInput }
            />
        ));
    }

    render(){
        return (
            <form id="message">
                { this.generateFields() }
                <button id="submit" onClick={this.handleSubmit.bind(this)}> Send Message</button>
            </form>
        )
    }

    componentDidCatch(error, info) {
        // // Display fallback UI
        // this.setState({ hasError: true });
        // // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);

        alert(error, info)
    }
}
