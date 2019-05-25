import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Notification from '../components/Notification';
import PopUp from '../components/PopUp';
import firebase from '../utils/firebase';

const FormInput = styled.input`
    padding: 1em;
    width:100%;
    margin-bottom: 1em;
    border: black 0.15rem solid;
    color: ${props => props.error ? "red" : "black"};
`

const FormTextArea = styled.textarea`
    padding: 1em;
    width:100%;
    margin-bottom: 1em;
    min-height: 10em;
    border: black 0.15rem solid;
    resize: vertical;
`

const FormBase = styled.div`
    padding: 0em;
    margin: 0;
    width:100%;
    /* position: absolute;
    left: 0;
    top: 0; */
    max-width: 50rem;
`
const FormHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
    h1, h2, h3, h4, h5, h6, p, a {
        margin: 0;
        padding: 0;
    }
`

const FormWrapper = styled.section`
    background: rgba(0,155,100,0.98);
    margin: 0;
    padding:1em;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: fadeIn 0.35s ;
    @keyframes fadeIn {
        0%{
            opacity: 0;
            scale(0);
        }

        100%{
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const Cross = styled.a`
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    &:before {
        content: "x";
    }
`

class Form extends React.Component {
    constructor(props){
        super(props);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.state = {
            isActive: false,
            notifications: [],
            status: '',
            name: '',
            contact: '',
            message: '',
            date: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.clearNotifications = this.clearNotifications.bind(this);
        this.maxLength = 150;
    }

    maxLength = {
        textField: 500,
        textArea: 50
    }
    componentDidMount(){
        this.setState(state => ({
            date: new Date()
        }))
    }

    componentWillUnmount() {
        this.clearNotifications();
    }

    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    getNotifications() {
        const { notifications } = this.state;
        console.log(notifications);
        return notifications.map(notification => (
            <Notification
                type={notification.type}
                message={notification.message}
            />
        ));
    }

    addNotification(type, message) {
        const { notifications } = this.state;
        notifications.push({
            type,
            message
        });

        this.setState({ notifications });
        console.debug(this.state.notifications)
    }

    clearNotifications() {
        this.setState({ notifications: [] });
    }

    getPopUp = () => {
        const status = this.state;
        if( status === 'done'){
            return (
                <popUp title="Success!" description="Your message has been saved. But the printing service still has to be made :/">
                </popUp>
            )
        } else if (status === 'failed') {
            return (
                <popUp title="Something went wrong">
                </popUp>
            )
        } else {
            return null
        }
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    }

    isValid = (data) => {
        if(data.name.length <= 0 || data.contact.length <= 0 || data.message.length <= 0){
            return {
                valid: false,
                error: "All fields are required",
                solution: "Please, fill in all fields"
            }
        }
        // Checks if input has no more charakters than specified in this.maxLength
        if(data.name.length > this.maxLength.textField || data.contact.length > this.maxLength.textField || data.message.length > this.maxLength.textArea){
            return {
                valid: false,
                error: "Message too long",
                solution: "Make your message shorter"
            }
        }
        return {
            valid: true,
            error: null,
            solution: null
        }
    }

    submit = (post) =>{
        // Link firebase
        const db = firebase.firestore();
        // Fill in user the message is meant for (TODO: move to config file)
        const USER = "Richard";
        // BUG: functino returns with undefined.
        db.collection("Users").doc(USER).collection("Messages").add(post).then((docRef) => {
            console.log("Message saved with ID: ", docRef.id);
            return true;
        }).catch((error) => {
            console.error("Error adding document: ", error);
            return false;
        });
    }

    handleSubmit = () => {
        // Check if input (which is saved in state) is valid.
        let validation = this.isValid(this.state);
        if(validation.valid){
            // valid: data is submitted
            // BUG: this.submit(this.state) does not return result;
            // Thus, submit.done is undefined.
            let post = {
                name: this.state.name,
                contact: this.state.contact,
                message: this.state.message,
                timestamp: this.state.date,
                printed: false
            }
            const submit = this.submit(post);
            console.log(submit);
            // Check if message is posted sucessfully
            if(submit){
                // Valid: Success Pop Up will appear
                this.setState(state => ({
                    status: 'done'
                }));
                console.log("saving done");
            } else {
                // Not Valid: Notification with error will appear
                this.setState(state => ({
                    status: 'failed'
                }));
                console.log("saving failed");
            }

        } else {
            // not valid: notification (type: error) will appear on top of the screen with the reason.
            this.addNotification('error', validation.solution);
        }
    }

    render(){
        const display = (displayMessage) => {
            if (displayMessage){
                return (
                    <FormWrapper>
                        <FormBase>

                            <FormHeader>
                                <h1>Message...</h1>
                                <Cross onClick={this.toggleDisplay}/>
                            </FormHeader>
                            <FormInput
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Your name"
                            />
                            <FormInput
                                name="contact"
                                value={this.state.contact}
                                onChange={this.handleInputChange}
                                placeholder="Email / Phone"
                            />
                            <FormTextArea
                                name="message"
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                placeholder="Your message..."
                                maxlength={this.maxLength}
                            />
                            <div>
                            <Button onClick={this.handleSubmit} href="#" title="Send"/>
                            </div>

                        </FormBase>
                        {this.getNotifications()}
                        {this.getPopUp()}
                    </FormWrapper>
                )
            } else {
                return null;
            }
        }
        return (
            display(this.state.isActive)

        )
    }
}

export default Form;
