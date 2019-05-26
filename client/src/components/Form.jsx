import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Notification from '../components/Notification';
import PopUp from '../components/PopUp';
import Embed from '../components/Embed';
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
            progress: '',
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
        this.setState(state => ({
            progress: '',
            name: '',
            contact: '',
            message: '',
            date: ''
        }));
    }

    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive
        }));
        if(this.state.isActive === false) {
            this.componentWillUnmount()
        }
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
        const progress = this.state.progress;
        console.log(progress)
        switch (progress) {
            case 'loading':
                return (
                    <PopUp title="loading..."></PopUp>
                )
            case 'failed':
                return (
                    <PopUp title="Something went wrong"></PopUp>
                )
            case 'success':
                return (
                    <PopUp
                        title="Success!"
                    >

                    </PopUp>
                )
            case 'finished':
                return (
                    <PopUp title="Your message is being printed" onClick={this.toggleDisplay}>
                        <Embed src="https://player.twitch.tv/?channel=bobross"/>
                        <p>Your work here is done! Now let's watch some Bob Ross</p>
                    </PopUp>
                )
            default:
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
        try {
            if(data.name.length <= 0 || data.contact.length <= 0 || data.message.length <= 0){
                throw new EvalError ({
                    valid: false,
                    error: "All fields are required",
                    solution: "Please, fill in all fields"
                })
            }
            // Checks if input has no more charakters than specified in this.maxLength
            if(data.name.length > this.maxLength.textField || data.contact.length > this.maxLength.textField || data.message.length > this.maxLength.textArea){
                throw new EvalError({
                    valid: false,
                    error: "Message too long",
                    solution: "Make your message shorter"
                })
            }
        } catch(e) {
            console.log(e)
            return e
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
        const USER = "Richard";

        return new Promise((resolve, reject) => {

            db.collection("Users").doc(USER).collection("Messages").add(post)
            .then((docRef)=>{
                console.log("Message saved with ID: ", docRef.id);
                resolve()
            })
            .catch((e)=>{
                reject(e)
            })
        })
    }

    handleSubmit = () => {
        // Check if input (which is saved in state) is valid.

        let validation = this.isValid(this.state);
        if(validation.valid){
            // valid: data is submitted
            // Get data in right data structure for posting
            let post = {
                name: this.state.name,
                contact: this.state.contact,
                message: this.state.message,
                timestamp: this.state.date,
                printed: false
            }
            console.log("Post validated!")
            this.setState(state => ({
                progress: 'loading'
            }))
            //submit post
            this.submit(post)
            .then(()=> {
                console.log("success")
                this.setState(state => ({
                    progress: 'success'
                }))
            })
            .then(()=> {
                setTimeout(()=>{
                    this.setState(state => ({
                        progress: 'finished'
                    }))
                }, 2000)
            })
            .catch((err) => {
                this.setState(state => ({
                    progress: 'failed'
                }))
            })

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
