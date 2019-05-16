import React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.a`
    border: 0.15rem solid black;
    padding: 0.5em 2em;
    margin: 1em 0;
    box-shadow: 0.5em 0.5em teal;
    transition: 0.2s ease;
    background-color: white;
    &:hover {
        box-shadow: 0.2em 0.2em teal;
    }
    &:active {
        background-color: whitesmoke;
    }
`

const Button = ({title, url}) => {
    return (
        <ButtonBase href={url}>{title}</ButtonBase>
    )
}

export default Button;
