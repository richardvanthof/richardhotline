import React from 'react';
import styled from 'styled-components';

import face from '../static/images/richard/face_4.png';

const Start = () => {
    const Main = styled.section`
        min-height: 100vh;
        animation: fadeIn 1s;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('${face}'), black;

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
    const Content = styled.div`
        width: 100%;
        max-width: 40rem;
        padding: 3em;
        background: teal;
    `

    return (
        <Main>
            <Content>
                <h1>Richard Hotline</h1>
                    {/* <img src={printer} alt="printer" /> */}
                <p>Does it sometimes seem like Richard has dissapeared from the world?
                    Doesn't he awnser his phone? Neither his email? He might be buzzy
                    behind his computer and not really thirsty for digital messages.
                    So, let's make some analog ones. Unfortunantly, postcards are quite slow.
                    Our solotion: drop your message here and we will print it out
                    and put it in front of his face.</p>
                <button  >Let's start!</button>
            </Content>
        </Main>
    )
}

export default Start;
