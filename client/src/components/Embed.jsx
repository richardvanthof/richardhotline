import React from 'react';
import styled from 'styled-components';

const height = '25rem'

const Placeholder = styled.div`
    width: 100%;
    height: 100%;
    min-height: ${height};
    background: rgba(255,255,255,0.75);
    position: relative;
    left: 0;
    top: 0;

`

const EmbedWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;
    margin-bottom: 1em;
    iframe {
        border: none;
        width: 100%;
        height: 100%;
        min-height: ${height};
    }
`

const Embed = (props) => {
    const loadIframe = () => {
        return (
            <Placeholder>

            </Placeholder>
        )
    }

    return (
        // <EmbedWrapper src={props.src}/>
        <EmbedWrapper>
            {loadIframe(props.src)}
        </EmbedWrapper>
    )
}

export default Embed;

{/* <iframe src={props.src} /> */}
