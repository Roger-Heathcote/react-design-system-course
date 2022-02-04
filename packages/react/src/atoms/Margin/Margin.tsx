import React from 'react'
import { Spacing } from '@r0g/react-course-foundation'

interface MarginProps {
    space?: keyof typeof Spacing
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}

const Margin: React.FC<MarginProps> = ({ space = 'md', children, left, right, top, bottom }) => {
    const classes = []
    if(left) classes.push(`dse-margin-left-${space}`)
    if(right) classes.push(`dse-margin-right-${space}`)
    if(top) classes.push(`dse-margin-top-${space}`)
    if(bottom) classes.push(`dse-margin-bottom-${space}`)
    if (classes.length === 0) classes.push(`dse-margin-${space}`)
    const className = classes.join(" ")

    return <div className={className}>
        { children }
    </div>
}

export default Margin