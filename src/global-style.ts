import 'normalize.css'
import { createGlobalStyle } from 'styled-components'
import 'typeface-indie-flower'

export const GlobalStyle = createGlobalStyle`
    html {
        font-family: "Indie Flower", serif;
    }
    html, body, #index {
        width: 100%;
        height: 100%;
    }
`
