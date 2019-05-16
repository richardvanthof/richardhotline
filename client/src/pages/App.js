import React from 'react';
import styled from 'styled-components';
import Typography from 'typography';

import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Button from '../components/Button';
import Form from '../components/Form';

import printer from '../static/images/printer.png';

const typography = new Typography({
    title: "Rich Art One",
    baseFontSize: "18px",
    baseLineHeight: 1.666,
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
        'h1': {
            color: 'white',
        }
      }),

})
// Output CSS as string.
typography.toString();
// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();


function App() {
    const Main = styled.main`
        padding: 2em 1em;
        min-height: 100%;
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

    const Body = styled.div`
        background: darkcyan;
    `
  return (
    <Body className="App">
        <Nav />
        <Main>
            <h1>Richard Hotline</h1>
            <img src={printer} alt="printer" />
            <p>Does it sometimes seem like Richard has dissapeared from the world?
                Doesn't he awnser his phone? Neither his email? He might be buzzy
                behind his computer and not really thirsty for digital messages.
                So, let's make some analog ones. Unfortunantly, postcards are quite slow.
                Our solotion: drop your message here and we will print it out
                and put it in front of his face.</p>
            <Button title="let's do this" url="#"/>
        </Main>
        <Form/>
        <Footer />
    </Body>
  );
}

export default App;
