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

const LoaderDots = () => {
    return (
        <Loader>
            <li/>
            <li/>
            <li/>
        </Loader>
    )
}

export default LoaderDots;
