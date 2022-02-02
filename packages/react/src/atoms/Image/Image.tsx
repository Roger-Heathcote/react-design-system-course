import React from 'react'
import { Spacing } from '@r0g/react-course-foundation'

interface ImageProps {
    url: string;
    width?: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}

const Image: React.FC<ImageProps> = ({url, width = Spacing.xxl, height = undefined}) => {
    let className = `dse-width-${width} dse-width-${width}-70pc`
    if(height) className = `dse-width-${width} .dse-height-${height}`
    return <img className={className} src={url} style={{
        objectFit: "cover"
    }}></img>
}

export default Image