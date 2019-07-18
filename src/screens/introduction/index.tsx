import * as React from 'react'
import { Redirect } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Column } from '../../Components/Column'

const Title = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 6em;
`

const blink = keyframes`
    50% {
        opacity: 0;
    }
`

const StartGame = styled.h2`
    animation: ${blink} 1.5s linear infinite;
    font-size: 4em;
`

interface IState {
    keyPressed: boolean
}

export class Introduction extends React.PureComponent<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            keyPressed: false,
        }
    }

    public render() {
        return (
            <Column align="center">
                <Title>Math Game</Title>
                <StartGame>Press any key to start</StartGame>
                {this.state.keyPressed && <Redirect to="/game" />}
            </Column>
        )
    }

    public componentDidMount() {
        document.addEventListener('keydown', () => this.onStart())
    }

    private onStart() {
        this.setState({ keyPressed: true })
    }
}
