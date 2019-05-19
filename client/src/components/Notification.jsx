import React from 'react';
import styled from 'styled-components';

const NotificationBase = styled.dialog`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1em;
    text-align: center;
    border: none;
    z-index: 10;
    animation-delay: 0s;
    animation: 0.5s fadeIn;
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(3em);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    p, a, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }
`

const Close = styled.a`
    display: inline;
    position: absolute;
    top: 1em;
    right: 2%;
    cursor: pointer;
`

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: true,
            time: 3
        }
        this.toggleDisplay = this.toggleDisplay.bind();
    }

    countDown = () => {
        if (this.state.time <= 0){
            this.setState(state => ({
                isActive: false
            }))
        } else {
            let newTime = this.state.time - 1;
            this.setState(state => ({
                time: newTime
            }))

        }
    }

    componentDidMount(){
        if(!this.props.infinite){
            if (this.props.time) {
                this.setState(state => ({
                    time: this.props.time
                }))
                setInterval(this.countDown, 1000);
            } else {
                setInterval(this.countDown, 1000);
            }
        }
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
                    <NotificationBase>
                        <p>{this.props.message}</p>
                        <Close onClick={this.toggleDisplay}>X</Close>
                    </NotificationBase>
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

export default Notification;
