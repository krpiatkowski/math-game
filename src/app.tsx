import * as React from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'

import { GlobalStyle } from './global-style'
import { Game } from './screens/game'
// import { Introduction } from './screens/introduction'

export class App extends React.PureComponent {
    public render() {
        return (
            <Router>
                <GlobalStyle />
                {/* <Route path="/" exact={true} component={Introduction} /> */}
                <Route path="/" component={Game} />
            </Router>
        )
    }
}
