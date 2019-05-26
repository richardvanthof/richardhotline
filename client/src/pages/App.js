import React from 'react';
import styled from 'styled-components';
import Typography from 'typography'


import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Button from '../components/Button';
import Form from '../components/Form';
import PopUp from '../components/PopUp';
import Notification from '../components/Notification';
import ErrorBoundary from '../components/ErrorBoundary';
import Embed from '../components/Embed';

import face from '../static/images/richard/face_4.png';

const typography = new Typography({
    title: "Rich Art One",
    baseFontSize: "18px",
    baseLineHeight: 1.55,
    scaleRatio: 2,
    includeNormalize: true,
    headerFontFamily: [
        "Avenir Next",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
    bodyFontFamily: ["avenir", "Georgia", "serif"],
    headerGray: 0,
    headerGrayHue: "warm",
    bodyGray: 0,
    bodyGrayHue: "warm",
    headerWeight: 600,
    bodyWeight: 400,
    boldWeight: 700,
    overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
        blockquote: {
          ...adjustFontSizeTo('135%'),
          paddingLeft: rhythm(13/16),
          lineHeight: '1.22em',
          marginLeft: rhythm(-1),
        },
        'blockquote > :last-child': {
          marginBottom: 0,
        },
      }),

})

typography.toString()
typography.injectStyles()



const Body = styled.div`
    background: whitesmoke;
`

const Start = styled.section`
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('${face}'), black;
    `
    const Content = styled.div`
        width: 100%;
        max-width: 40rem;
        padding: 3em;
        background: bisque;
        animation: fadeIn 1s;
        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(-3rem);
            }
            75% {
                opacity: 0;
                transform: translateY(-3rem);
            }
            100% {
                opacity: 1;
                transform: translateY(0rem);
            }
        }
    `
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.composeWindow = React.createRef();
        this.state = {
            displayComposeWindow: false
        }
    }

    componentDidMount(){

    }

    handleClick(){
        this.composeWindow.current.toggleDisplay();
    }

    render() {
        return (
            <Body className="App">
                <ErrorBoundary>

                    <main>
                        <Start>
                            <Content>
                                <h1>Richard Hotline</h1>
                                <p>Let's face it.Does it sometimes seem like Richard has dissapeared from the world?
                                    Doesn't he awnser his phone? Neither his email? He might be buzzy
                                    behind his computer and not really thirsty for digital messages.
                                    So, let's make some analog ones. Unfortunantly, postcards are quite slow.
                                    Our solotion: drop your message here and we will print it out
                                    and put it in front of his face.</p>
                                <Button onClick={this.handleClick} title="Let's start"/>
                            </Content>
                        </Start>
                        <Form
                            ref={this.composeWindow}
                            display={this.state.displayComposeWindow}
                            maxTextFieldLength={50}
                            maxTextAreaLength={400}
                        />
                    </main>
                    <Footer />
                    <PopUp

                        title="Nobody is perfect, and especially not this app"
                        description="Thank you for testing the Richard Hotline.
                        Please take note that this program is still in development.
                        This means that some bugs might occur"
                    >
                        <h3>Known errors</h3>
                        <ul>
                            <li>Messages currently are not printed automaticially yet. This means that messages will not yet be delivered in realtime. Thet will be saved, though.</li>
                        </ul>
                    </PopUp>
                </ErrorBoundary>
            </Body>
        )
    }
};

export default App;
