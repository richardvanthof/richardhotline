import React from 'react';
import styled from 'styled-components';

const EmbedWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;

    iframe {
        border: none;
        width: 100%;
        height: 100%;
        min-height: 15rem;
    }
`

const Embed = (props) => {
    return (
        // <EmbedWrapper src={props.src}/>
        <EmbedWrapper>
            <iframe src={props.src} />
        </EmbedWrapper>
    )
}

export default Embed;
