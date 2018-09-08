import React from 'react';
import Richard from '../assets/img/richard.JPG';


export class Start extends React.Component{ 

    
    render(){
        return (
            <section id="start">
                <figure className="round"><img src={Richard} alt="Photo of Richard's beautiful mug."/></figure>
                <h1>Richard Hotline</h1>
                <p>Does it sometimes seem like Richard has dissapeared from the world? Doesn't he awnser his phone? Neither his email? He might be buzzy behind his computer and not really thirsty for digital messages. So, let's make some analog ones. Unfortunantly, postcards are quite slow. Our solotion: drop your message here and we will print it out and put it in front of his face.</p>
                <button value="message" onClick={this.props.onClick}>New Message</button>

                <p className="small">By clicking this button you agree with our <a href="#wow-we-did-not-think-somebody-would-actiually-read-this">End user License Agreement</a></p>
            </section>    
        )
    }

    componentDidMount() {
        let loader = document.getElementById('loader');
        loader.remove();
    }
}