import { IProblem, Operator } from './problem'

export class ProblemGenerator {
    public next(): IProblem {
        return {
            timeMax: 10000,
            timeStart: Date.now(),
            expression: {
                left: Math.round(Math.random() * 10),
                right: Math.round(Math.random() * 10),
                operator: Operator.plus,
            },
        }
    }
}
