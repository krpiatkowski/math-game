import 'normalize.css'
import { createGlobalStyle } from 'styled-components'
import 'typeface-audiowide'

export const GlobalStyle = createGlobalStyle`
    html {
        font-family: "Audiowide", serif;
    }
    html, body, #index {
        width: 100%;
        height: 100%;
    }
`
