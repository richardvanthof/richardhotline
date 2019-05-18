import React from 'react';
import styled from 'styled-components';

import LoaderDots from '../components/Animations';

const ButtonBase = styled.button`
    border: 0.15rem solid black;
    padding: 0.5em 2em;
    margin: 0.25em 0;
    margin-right: 0.5em;
    box-shadow: 0.3em 0.3em teal;
    transition: 0.1s ease;
    background-color: white;
    display: inline-block;
    cursor: pointer;
    &:hover {
        box-shadow: 0.5em 0.5em teal;
    }
    &:active {
        background-color: whitesmoke;
        box-shadow: 0.2em 0.2em teal;
        border: 0.15rem solid gray;
        color: gray;
    }
`

const DisabledBtn = styled(ButtonBase)`
    cursor: not-allowed;
    background-color: whitesmoke;
    box-shadow: 0.1em 0.1em teal;
    border: 0.15rem solid gray;
    color: gray;
    &:hover {
        background-color: whitesmoke;
        box-shadow: 0.1em 0.1em teal;
        border: 0.15rem solid gray;
        color: gray;
    }
`

const LoadingBtn = styled(ButtonBase)`
    cursor: progress;
    background-color: whitesmoke;
    box-shadow: 0.2em 0.2em teal;
    border: 0.15rem solid gray;
    color: gray;
    padding: 0.5em 2em 0.2em 2em
    &:hover {
        background-color: whitesmoke;
        box-shadow: 0.2em 0.2em teal;
        border: 0.15rem solid gray;
        color: gray;
    }
`

class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const getButton = (type) => {
            if(type === 'disabled') {
                return (
                    <DisabledBtn>{this.props.title}</DisabledBtn>
                )
            } else if(type === 'loading') {
                return (
                    <LoadingBtn>{this.props.title}<LoaderDots/></LoadingBtn>
                )
            } else {
                return (
                    <ButtonBase onClick={this.props.onClick} href={this.props.url}>{this.props.title}</ButtonBase>
                )
            }
        }
        return (
            getButton(this.props.type)
        )
    }
}

export default Button;
