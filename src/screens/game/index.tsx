import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import { Column } from '../../Components/Column'

const TopBar = styled.div`
    width: 100%;
    font-size: 2em;
    height: 30px;
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
`

const TimerContainer = styled.div`
    position: relative;
    width: 100px;
`

const ScoreContainer = styled.div`
    width: 100px;
`

const scoreAnimation = keyframes`
    0% {
        top: 0px;
        left: 0%;
        opacity: 0;
    }
    25% {
        top: -0.2em;
        opacity: 1;
    }
    50% {
        top: -0.2em;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 100%;
        opacity: 0;
    }
`

const AnimationedScore = styled(ScoreContainer)`
    position: absolute;
    animation: ${scoreAnimation} 0.3s forwards ease-out;
    color: green;
    top: 0;
`

interface IProblem {
    timeMax: number
    timeStart: number
    score?: number
}

interface IState {
    score: number
    problemScore?: number
    problem: IProblem
    animatedProblems: IProblem[]
}

export class Game extends React.Component<{}, IState> {
    private timer: number

    constructor(props: {}) {
        super(props)
        this.state = {
            score: 0,
            problem: null,
            animatedProblems: [],
        }
    }

    public render() {
        return (
            <Column align="top">
                <TopBar>
                    {this.state.problem && (
                        <TimerContainer>
                            {this.state.problemScore}
                            {this.state.animatedProblems.map(p => (
                                <AnimationedScore
                                    key={p.timeStart}
                                    onAnimationEnd={this.updateScore(p)}
                                >
                                    {p.score}
                                </AnimationedScore>
                            ))}
                        </TimerContainer>
                    )}
                    <ScoreContainer>{this.state.score}</ScoreContainer>
                </TopBar>
            </Column>
        )
    }

    public componentDidMount() {
        this.nextProblem()

        this.timer = window.setInterval(() => {
            this.setState(state => {
                const score = Math.round(
                    (state.problem.timeMax - (Date.now() - state.problem.timeStart)) / 100
                )
                return { problemScore: score > 0 ? score : 0 }
            })
        })
        document.addEventListener('keydown', () => this.onAnswer())
    }

    public componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    private updateScore = (problem: IProblem) => () => {
        this.setState(state => ({
            score: state.score + problem.score,
            animatedProblems: state.animatedProblems.filter(p => p !== problem),
        }))
    }

    private onAnswer() {
        this.nextProblem()
    }

    private nextProblem() {
        let animatedProblems = this.state.animatedProblems
        if (this.state.problem) {
            this.state.problem.score = this.state.problemScore
            animatedProblems = [...this.state.animatedProblems, this.state.problem]
        }

        this.setState({
            problem: { timeMax: 10000, timeStart: Date.now() },
            animatedProblems,
        })
    }
}
