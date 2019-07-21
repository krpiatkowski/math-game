import styled, { keyframes } from 'styled-components'

export const TopBar = styled.div`
    width: 100%;
    font-size: 2em;
    height: 70px;
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
    align-items: center;
`

export const ScoreContainer = styled.div`
    width: 200px;
`

export const AnimatedScoreContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 200px;
    height: 100%;
`

const scoreAnimation = keyframes`
    0% {
        left: 0%;
        opacity: 1;
    }
    50% {
        left: 0%;
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 0;
    }
`

export const AnimationedScore = styled(ScoreContainer)`
    position: absolute;
    animation: ${scoreAnimation} 0.7s forwards ease-out;
    color: green;
`

export const ProblemScoreContainer = styled.div`
    position: absolute;
    top: 10%;
`

export const ProblemContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-content: stretch;
    justify-content: center;
    align-items: center;
    font-size: 5em;
    position: relative;
`

export const AnswerInput = styled.input`
    outline-width: 0;
    border: 0;
    width: 100px;
    text-align: left;
    flex-grow: 1;
`

export const EqualsContainer = styled.div`
    width: 1em;
    text-align: center;
`

export const ExpressionContainer = styled.div`
    flex-grow: 1;
    text-align: right;
`
