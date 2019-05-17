import React from 'react';
import styled from 'styled-components';

// import LoaderDots from '../components/Animations';

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



class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }
    }



    render(){
        return (
            <ButtonBase onClick={this.props.onClick} href={this.props.url}>{this.props.title}</ButtonBase>

        )
    }
}

export default Button;
