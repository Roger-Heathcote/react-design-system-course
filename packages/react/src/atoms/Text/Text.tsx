import React from 'react'
import { FontSize } from '@r0g/react-course-foundation'

interface TextProps {
    size?: keyof typeof FontSize
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
    const className = `dse-text dse-text-${size}`
    
    return <span className={className}>{children}</span>
}

export default Text