import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

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
    animation: fadeIn 1s ease-in-out;
    @keyframes fadeIn {
        0%{
            opacity: 0;
            filter: blur(10em);
            transform: translateY(100vh);
        }
        100%{
            opacity: 1;
            filter: blur(0)
            transform: translateY(0);
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
            name: '',
            contact: '',
            message: '',
            date: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                error: "Please, fill in all fields"
            }
        }
        if(name.length > 50 || contact.length > 50 || message.length > 300){
            return {
                valid: false,
                error: "Please, make your message shorter"
            }
        }
        return {
            valid: true,
            error: null
        }
    }

    handleSubmit = () => {
        const target = this.state;
        let isValid = this.isValid(target);
        console.log(isValid);
        if(isValid.valid){
            let data = this.serialise(target);
        } else {
            alert(isValid.error);
        }
    }

    updateName
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

                        </FormBase>
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
