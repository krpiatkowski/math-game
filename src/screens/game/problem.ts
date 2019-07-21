export interface IProblem {
    timeMax: number
    timeStart: number
    score?: number
    expression: IExpression
}

export interface IExpression {
    left: IExpression | number
    right: IExpression | number
    operator: Operator
}

export enum Operator {
    plus = '+',
}

export const evaluate = (problem: IProblem): number => evaluateExpr(problem.expression)

const evaluateExpr = (expression: IExpression): number => {
    const left =
        typeof expression.left === 'number' ? expression.left : evaluateExpr(expression.left)
    const right =
        typeof expression.right === 'number' ? expression.right : evaluateExpr(expression.right)

    switch (expression.operator) {
        default:
        case Operator.plus:
            return left + right
    }
}
