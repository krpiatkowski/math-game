import styled from 'styled-components'

interface IProps {
    align: 'top' | 'center' | 'bottom'
}

export const Column = styled.div<IProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.align};
    height: 100%;
`
