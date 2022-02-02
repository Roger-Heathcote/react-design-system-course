import React from 'react'
import { Spacing } from '@r0g/react-course-foundation'

interface ColorProps {
    hexCode: string;
    width: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}

const Color: React.FC<ColorProps> = ({hexCode, width = Spacing.sm, height = Spacing.sm}) => {
    const className = `dse-width-${width} dse-height-${height}`
    return <div className={className} style={{
        backgroundColor: hexCode,
    }}></div>
}

export default Color