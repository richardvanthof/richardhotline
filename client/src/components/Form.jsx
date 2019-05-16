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
`

const FormBase = styled.form`
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
`

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
            isActive: false
        }
    }

    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    handleClick = () => {
        //function
    }

    render(){
        const display = (displayMessage) => {
            console.log(displayMessage);
            if (displayMessage){
                return (
                    <FormWrapper>
                        <FormBase>
                            <FormHeader>
                                <h1>Message...</h1>
                                <Cross onClick={this.toggleDisplay}/>
                            </FormHeader>
                            <FormInput placeholder="Your name"/>
                            <FormInput placeholder="Email / Phone"/>
                            <FormTextArea placeholder="Your message..."/>
                            <Button onClick={this.handleClick} title="Send"/>
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
