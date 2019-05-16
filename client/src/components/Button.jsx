import React from 'react';
import styled from 'styled-components';
const Loader = styled.ul`
        list-style: none;
        margin: 0;
        display: inline-flex;
        margin-left: 0.1em;
        li{
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 10rem;
            background-color: rgba(0,0,0,0.25);
            margin-left: 0.2em;
            &:nth-child(1){
                animation: loaderDot 0.5s ease-in-out infinite;
            }
            &:nth-child(2){
                animation: loaderDot 0.5s ease-in-out infinite;
                animation-delay: 1.1s;
            }
            &:nth-child(3){
                animation: loaderDot 0.5s ease-in-out infinite;
                animation-delay: 2.2s;
            }
        }
        @keyframes loaderDot {
            0% {
                transform: translateY(0);
                background-color: rgba(0,0,0,0.25);
            }
            50% {
                transform: translateY(-0.25em);
                background-color: rgba(0,0,0,0.4);
            }
           60% {
                transform: translateY(0);
                background-color: rgba(0,0,0,0.25);
            }
            100% {
                transform: translateY(0);
                background-color: rgba(0,0,0,0.25);
            }
        }

    `

const ButtonBase = styled.button`
    border: 0.15rem solid black;
    padding: 0.5em 2em;
    margin: 0.25em 0;
    margin-right: 0.5em;
    box-shadow: 0.3em 0.3em teal;
    transition: 0.1s ease;
    background-color: white;
    display: inline-block;
    &:hover {
        box-shadow: 0.5em 0.5em teal;
    }
    &:active {
        background-color: whitesmoke;
        box-shadow: 0.2em 0.2em teal;
        border: 0.15rem solid gray;
    }
`

const LoadingDots = (
    <Loader>
        <li/>
        <li/>
        <li/>
    </Loader>
)

const Button = ({title, url, onClick}) => {
    return (
        <ButtonBase onClick={onClick} href={url}>{title}</ButtonBase>
    )
}

export default Button;
