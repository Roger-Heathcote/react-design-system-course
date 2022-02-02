import React from 'react';
import { Spacing } from '@r0g/react-course-foundation';

const Image = ({ url, width = Spacing.xxl, height = undefined }) => {
    let className = `dse-width-${width} dse-width-${width}-70pc`;
    if (height)
        className = `dse-width-${width} .dse-height-${height}`;
    return React.createElement("img", { className: className, src: url, style: {
            objectFit: "cover"
        } });
};

export { Image as default };
//# sourceMappingURL=Image.js.map
