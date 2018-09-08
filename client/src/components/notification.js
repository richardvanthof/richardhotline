import React from 'react';
import successGif from '../assets/img/success.gif';

export class Notification extends React.Component{
    
    render(){
        return (
            <section id="notification">
                <figure className="round"><img src={successGif} alt="Success"/></figure>
                <h1>[USER], your message has been received!</h1>
                <p>Richard will react as soon as possible</p>
                <button>done</button>
                <button>New Message</button>
            </section>    
        )
    }

}