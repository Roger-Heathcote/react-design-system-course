import React from 'react';

const Margin = ({ space = 'md', children, left, right, top, bottom }) => {
    const classes = [];
    if (left)
        classes.push(`dse-margin-left-${space}`);
    if (right)
        classes.push(`dse-margin-right-${space}`);
    if (top)
        classes.push(`dse-margin-top-${space}`);
    if (bottom)
        classes.push(`dse-margin-bottom-${space}`);
    if (classes.length === 0)
        classes.push(`dse-margin-${space}`);
    const className = classes.join(" ");
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
