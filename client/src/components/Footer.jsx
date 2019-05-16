import React from 'react';
import styled from 'styled-components';

const FooterBase = styled.footer`
    padding: 3em 1em 1em 1em;
`

const Footer = () => {
    return (
        <FooterBase>
            <p>A project by <a href="https://therichart.space">Richad van 't Hof</a>. View code on <a href="https://github.com/richart-official/richardhotline">GitHub</a></p>
        </FooterBase>
    )
}

 export default Footer;
