import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Notification from '../components/Notification';
import PopUp from '../components/PopUp';

const FormInput = styled.input`
    padding: 1em;
    width:100%;
    margin-bottom: 1em;
    border: black 0.15rem solid;
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
            name: '',
            contact: '',
            message: '',
            date: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.clearNotificatinos = this.clearNotifications.bind(this);
        this.maxLength = 150;
    }

    componentDidMount(){
        this.setState(state => ({
            date: new Date()
        }))
        console.log("New message initiated at" + this.state.date);
    }

    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    getNotifications() {
        const { notifications } = this.state;
        return notifications.map(notification => (
            <Notification
                type={notification.type}
                message={notification.message.solution}
            />
        ));
    }

    addNotification(type, message) {
        const { notifications } = this.state;
        notifications.push({
            type,
            message
        });
        console.debug(this.state.notifications)
        this.setState({ notifications });
    }

    clearNotifications() {
        this.setState({ notifications: [] });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    serialise = (target) => {
        let dataObject = {
            name: target['name'],
            contact: target['contact'],
            message: target['message'],
            date: target['date']
        }
        console.debug(dataObject);
        let json = JSON.stringify(dataObject);
        console.debug(json);
        return json;
    }

    isValid = (target) => {
        const name = target.name;
        const contact = target.contact;
        const message = target.message;
        if(name.length <= 0 || contact.length <= 0 || message.length <= 0){
            return {
                valid: false,
                error: "All fields are required",
                solution: "Please, fill in all fields"
            }
        }
        if(name.length > 50 || contact.length > 50 || message.length > 300){
            return {
                valid: false,
                error: "Message too long",
                solution: "Please, fill in all fields"
            }
        }
        return {
            valid: true,
            error: null
        }
    }

    handleSubmit = () => {
        let validation = this.isValid(this.state);
        console.log(validation);
        if(validation.valid){
            let data = this.serialise();

        } else {
            this.addNotification('error', validation);
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
                               dasf onChange={this.handleInputChange}
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
                            {this.state.error === false &&
                                <PopUp title="Your message will be printed shortly">
                                    content
                                </PopUp>
                            }

                        </FormBase>
                        {this.getNotifications()}
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
