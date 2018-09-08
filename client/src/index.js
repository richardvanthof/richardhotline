import React from 'react';
import ReactDOM from 'react-dom';
import { Start } from './components/start';
import { Message } from './components/message';
import { Notification } from './components/notification';
import { Close } from './components/close';
import { Terms } from './components/terms';
import { About } from './components/about';
import "./styles/style.scss";

// Declare DOM-element where app will be injected
const ROOT = document.getElementById('app');



class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screen: 'start'
        }
        this.changeScreen = this.changeScreen.bind(this);
    }

    changeScreen(newScreen){
        this.setState({
            screen: newScreen.target.value
        })
        console.log(newScreen.target.value);
        console.log(this.state.screen);
    }

    toggle(){
        let newScreen = this.state.screen;
        if( newScreen === 'message') {
            return (
                <Message/>
            ) 
        } else {
            return (
                <Start onClick={this.changeScreen}/>
            )
        }
    }

    render(){
        return(
            <main>
                {this.toggle()}
            </main>  
        )
    }
}

ReactDOM.render(<Controller />, ROOT)