import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const error = {
    title: "The printer is offline",
    description: "We could not connect to the printer. Until the printer comes back online, the message will be stored online until the device comes back online.",
    code: "Code 500"
}

const AlertBase = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: coral;
    padding: 1em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

`

const AlertContent = styled.div`
    max-width: 30rem;
    width: 100%;
    padding: 1em;
`

const Alert = () => {
    return (
        <AlertBase>
            <AlertContent>
                <h1>{error.title}</h1>
                <p>{error.description} <small>{error.code}</small></p>
                <Button title="ok" />
            </AlertContent>
        </AlertBase>
    )
}

export default Alert;
