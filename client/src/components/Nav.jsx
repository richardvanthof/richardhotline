import React from 'react';
import styled from 'styled-components';

import logo from '../static/icons/logo.svg';

const NavBase = styled.nav`
    border-bottom: 0.25em solid black;
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: whitesmoke;
    h1, h2, h3, h4, h5, h6, a, p, img {
        margin: 0;
    }
`
const NavLogo = styled.div`
    margin: 0;
    padding: 0;
    img {
        width: 4rem;
    }
`

const NavLinks = styled.div`

`

const Nav = () => {
    return (
        <NavBase>
            <NavLogo><img src={logo}/></NavLogo>
            <NavLinks>
                <a href="#">About</a>
            </NavLinks>
        </NavBase>

    )
}

export default Nav
