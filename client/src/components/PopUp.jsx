import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';


const AlertBase = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: aliceblue;
    padding: 1em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation: fadeIn 1s ease-in-out;
    @keyframes fedeIn {
        0% {
            transform: translateX(-2em);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
`

const AlertContent = styled.div`
    max-width: 30rem;
    width: 100%;
    padding: 1em;
`

class PopUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: true
        }
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay = () =>{
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    render(){
        const display = (active) => {
            if(active){
                return (
                    <AlertBase>
                        <AlertContent>
                            <h1>{this.props.title}</h1>
                            {this.props.children}
                            <p>
                                {this.props.description}
                                {
                                    this.props.code > 0 &&
                                    <small>Code {this.props.code}</small>
                                }
                            </p>
                            {
                                !this.props.noButton &&
                                <Button
                                    onClick={this.toggleDisplay}
                                    title={
                                        this.props.button ? this.props.button : "Ok"
                                    }
                                />
                            }
                        </AlertContent>
                    </AlertBase>
                )
            } else {
                return (
                    null
                )
            }
        }
        return (
            display(this.state.isActive)
        )
    }
}

export default PopUp;
