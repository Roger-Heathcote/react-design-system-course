import React from 'react';
import { FontSize } from '@r0g/react-course-foundation';

const Text = ({ size = FontSize.base, children }) => {
    const className = `dse-text dse-text-${size}`;
    return React.createElement("span", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
