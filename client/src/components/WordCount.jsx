import React from 'react';
import styled from 'styled-components';

const CounterBase = styled.p`
    display: inline-flex;
    justify-self: end;
    align-self: normal;
    float: right;
    transform: translateY(-0.3em);
    color: ${props => props.inputColor || "inherit"}
`

const WordCount = (props) => {
    let counter = props.max - props.amount
    return (
            <CounterBase inputColor={ counter < 0 ? "palevioletred" : "black"}>
            <small>
                {counter}
            </small>
        </CounterBase>
    )
}

export default WordCount
