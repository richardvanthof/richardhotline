import React from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';

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
        animation: 1s fadeIn ease-in-out;
        @keyframes fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }
`

const Embed = (props) => {

    let loaded = false;
    const content = async (url) => {
        console.log("fetching video: "+url)
        let source = await fetch(url);
        loaded = true;
        console.log(source);
        return source
    }
    if(loaded) {
        return (
            <EmbedWrapper>
                <iframe title="video" src={content(props.src)}/>
            </EmbedWrapper>
        )
    } else {
        return (
            <EmbedWrapper>
                <iframe title="video" src={props.src}/>
            </EmbedWrapper>

        )
    }
}

export default Embed;

{/*  */}
