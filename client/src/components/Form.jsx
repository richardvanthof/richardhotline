import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const FormInput = styled.input`
    padding: 0.1em;
    width:100%;
    margin-bottom: 1em;
`

const FormTextArea = styled.textarea`
    padding: 0.1em;
    width:100%;
    margin-bottom: 1em;
    min-height: 10em;
`

const FormBase = styled.form`
    padding: 1em;
    width:100%;
    height: 100vh;
    /* position: absolute;
    left: 0;
    top: 0; */
    background: rgba(0,155,100,0.9);
`

const Form = () => {
    return (
        <FormBase>
            <h1>Message...</h1>
            <FormInput/>
            <FormInput/>
            <FormTextArea/>
            <Button title="Send"/>
        </FormBase>
    )
}
export default Form;
