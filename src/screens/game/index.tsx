import * as React from 'react'

import { Column } from '../../components/Column'

import { Expression } from './expression'
import { IProblem } from './problem'
import { ProblemGenerator } from './problemGenerator'
import {
    AnimatedScoreContainer,
    AnimationedScore,
    AnswerInput,
    EqualsContainer,
    ExpressionContainer,
    ProblemContainer,
    ProblemScoreContainer,
    ScoreContainer,
    TopBar,
} from './styled'

interface IState {
    score: number
    problemScore?: number
    problem: IProblem
    animatedProblems: IProblem[]
    answer: string
}

export class Game extends React.Component<{}, IState> {
    private timer: number
    private problemGenerator = new ProblemGenerator()

    constructor(props: {}) {
        super(props)
        this.state = {
            score: 0,
            problem: null,
            animatedProblems: [],
            answer: '',
        }
    }

    public render() {
        return (
            <Column align="top">
                {this.state.problem && (
                    <>
                        <TopBar>
                            <AnimatedScoreContainer>
                                {this.state.animatedProblems.map(p => (
                                    <AnimationedScore
                                        key={p.timeStart}
                                        onAnimationEnd={this.updateScore(p)}
                                    >
                                        {p.score}
                                    </AnimationedScore>
                                ))}
                            </AnimatedScoreContainer>
                            <ScoreContainer>{this.state.score}</ScoreContainer>
                        </TopBar>
                        <ProblemContainer>
                            <ProblemScoreContainer>{this.state.problemScore}</ProblemScoreContainer>
                            <ExpressionContainer>
                                <Expression expression={this.state.problem.expression} />
                            </ExpressionContainer>
                            <EqualsContainer>=</EqualsContainer>
                            <AnswerInput
                                type="text"
                                onChange={this.onAnswerChanged}
                                value={this.state.answer}
                                autoFocus={true}
                            />
                        </ProblemContainer>
                    </>
                )}
            </Column>
        )
    }

    public componentDidMount() {
        this.onAnswer()

        this.timer = window.setInterval(() => {
            this.setState(state => {
                const score = Math.round(
                    (state.problem.timeMax - (Date.now() - state.problem.timeStart)) / 100
                )
                return { problemScore: score > 0 ? score : 0 }
            })
        })
        document.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                this.onAnswer()
            }
        })
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
        let animatedProblems = this.state.animatedProblems
        if (this.state.problem) {
            this.state.problem.score = this.state.problemScore
            animatedProblems = [...this.state.animatedProblems, this.state.problem]
        }

        this.setState({
            problem: this.problemGenerator.next(),
            animatedProblems,
            answer: '',
        })
    }

    private onAnswerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedInt = parseInt(event.target.value, 10)
        if (Number.isInteger(parsedInt) || event.target.value === '') {
            this.setState({ answer: event.target.value })
        }
    }
}
