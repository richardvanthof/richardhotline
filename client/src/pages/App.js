import React from 'react';
import styled from 'styled-components';

import Typography from 'typography';



const typography = new Typography({
    baseFontSize: '21px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
    bodyFontFamily: ['Georgia', 'serif'],
    // See below for the full list of options.
});
// Output CSS as string.
typography.toString();
// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();



function App() {
    const H1 = styled.h1`
        color: red;
    `
  return (
    <div className="App">
        <H1>Richardhotline</H1>
    </div>
  );
}

export default App;
