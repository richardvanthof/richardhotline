import React from 'react';
import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';

import Button from '../components/Button';
import Notification from '../components/Notification';
import PopUp from '../components/PopUp';
import Embed from '../components/Embed';
import WordCount from '../components/WordCount';
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
    background: rgba(0,155,100,0.95);
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
    transition: 1s ease-in-out;
    animation: fadeIn 0.35s;
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
const CounterBase = styled.p`
    display: flex;
    justify-content: space-between;
    color: red;
`


class Form extends React.Component {
    constructor(props){
        super(props);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.state = {
            isActive: false,
            notifications: [],
            popups: [],
            progress: 'finished',
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



    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive,
            progress: ' '
        }));
    }

    getNotifications() {
        const { notifications } = this.state;
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
    }

    clearNotifications() {
        this.setState({ notifications: [] });
    }

    getPopUp = (m) => {
        const progress = this.state.progress;
        switch (progress) {
            case 'loading':
                return (
                    <PopUp
                        noButton
                        title="Sending your message..."
                    ></PopUp>
                )

            case 'success':
                return (
                    <PopUp
                        noButton
                        title="Success!"
                    >

                    </PopUp>
                )
            case 'finished':
                return (
                    <PopUp
                        title="Your message is being printed"
                    >
                        <Embed src="https://www.youtube.com/embed/7R9HcaDT9P4" autoplay allowfullscreen/>
                        <p>Your work here is done. We are going to deliver your
                            message as soon as possible. For in the meantime,
                            let's watch some Bob Ross</p>
                    </PopUp>
                )
            default:
                return null
        }
    }

    addPopUp(type, message) {
        const { popups } = this.state;
        popups.push({
            type,
            message
        });

        this.setState({ popups });
        console.debug(this.state.popups)
    }

    clearPopUps() {
        this.setState({ popups: [] });
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            progress: ' '
        });
    }
    isValid = (data) => {
        return new Promise((resolve, reject)=>{
            try {
                // Verifies if input is filled in
                if(data.name.length <= 0 || data.contact.length <= 0
                    || data.message.length <= 0){
                    throw new EvalError ("Please, fill in all the fields")
                }
                if( data.name.length > this.props.maxTextFieldLength ||
                    data.contact.length > this.props.maxTextFieldLength){
                    throw new EvalError("No name, email or phone number should be that long! Make them shorter, you hacker :)")
                    }
                // Checks if input has no more charakters than specified in this.maxLength
                if( data.message.length > this.props.maxTextAreaLength){
                    throw new EvalError("Please, make your message shorter")
                }
            } catch(e) {
                console.log(e)
                reject(e)
            }
            resolve()
        })
    }

    async handleSubmit(){
        // Check of content is valid
        console.log("Submitting...")

        const submit = firebase.functions().httpsCallable('addMessage');
        this.setState(state => ({
            progress: 'loading'
        }))
        const getData = () => {
            // Get all message data and make JSON.
            let post = {
                name: sanitizeHtml(this.state.name),
                contact: sanitizeHtml(this.state.contact),
                message: sanitizeHtml(this.state.message),
                timestamp: this.state.date,
                printed: false
            }
            return post;
        }
        const post = getData();
        console.log(post)
        this.isValid(post)
        .then(()=>{
            submit(post)
        })
        .then((docRef)=> {
            console.log(docRef)
            this.setState(state => ({
                progress: 'success'
            }))
        })
        .then(()=>{
            setTimeout(()=>{
                this.setState(state => ({
                    progress: 'finished',
                    name: '',
                    contact: '',
                    message: '',
                    date: '',
                    notifications: []
                }))
            }, 1000)
        }).catch((err)=>{
            // Getting the Error details.
            let code = err.code;
            let message = err.message;
            let details = err.details;

            this.setState(state => ({
                progress: 'failed'
            }))
            console.log(code, message, details);
            this.addNotification('error', message)
        });
    }

    componentDidMount(){
        this.setState(state => ({
            date: new Date()
        }))
    }

    componentWillUnmount() {
        this.clearNotifications();
        this.clearPopUps();
        this.setState(state => ({
            progress: '',
            name: '',
            contact: '',
            message: '',
            date: ''
        }));
    }

    render(){
        const display = (displayMessage) => {
            if (displayMessage){
                return (
                    <FormWrapper>
                        <FormBase>

                            <FormHeader>
                                <h1>Send a message</h1>
                                <Cross onClick={this.toggleDisplay}/>
                            </FormHeader>
                            <FormInput
                                name="name"
                                maxLength={this.props.maxTextFieldLength}
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Your name"
                            />
                            <FormInput
                                name="contact"
                                maxLength={this.props.maxTextFieldLength}
                                value={this.state.contact}
                                onChange={this.handleInputChange}
                                placeholder="Email / Phone"
                            />
                            <FormTextArea
                                name="message"
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                placeholder="Your message..."
                            />
                            <div>
                            <Button onClick={this.handleSubmit} href="#" title="Send"/>
                            <WordCount amount={this.state.message.length} max={this.props.maxTextAreaLength}/>
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
