import React from 'react';
import styled from 'styled-components';

import logo from '../static/icons/logo.svg';

const FooterBase = styled.footer`
    padding: 0.5em;
    p {
        margin:0;
        padding:0;
    }
`

const Footer = () => {
    return (
        <FooterBase>
            <p><small>A project by <a href="https://therichart.space">Richad van 't Hof</a>. View code on <a href="https://github.com/richart-official/richardhotline">GitHub</a></small></p>
        </FooterBase>
    )
}

 export default Footer;
