import * as React from 'react'

import { IExpression } from './problem'

interface IProps {
    expression: IExpression | number
}

export class Expression extends React.PureComponent<IProps> {
    public render() {
        if (typeof this.props.expression === 'number') {
            return this.props.expression
        } else {
            return (
                <>
                    <Expression expression={this.props.expression.left} />
                    {this.props.expression.operator}
                    <Expression expression={this.props.expression.right} />
                </>
            )
        }
    }
}
