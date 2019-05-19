import React from 'react';
import Typography from 'typography'

const applyTypography = () => {
    const typography = new Typography({
        title: "Rich Art One",
        baseFontSize: "18px",
        baseLineHeight: 1.55,
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
          }),
    
    })

    typography.toString()
    typography.injectStyles()
}


export default applyTypography;


