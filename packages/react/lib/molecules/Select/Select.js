import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options = [], label = "Please select an option ...", onOptionSelected: handler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    const onOptionSelected = (option, optionIndex) => {
        if (handler)
            handler(option, optionIndex);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) - 1);
    }, [labelRef.current?.offsetHeight]);
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { ref: labelRef, className: 'dse-select__label', onClick: onLabelClick },
            React.createElement("span", null, label),
            React.createElement("svg", { width: "1rem", height: "1rem", className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React.createElement("ul", { style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            return (React.createElement("li", { onClick: () => onOptionSelected(option, optionIndex), key: option.value }, option.label));
        }))) : null));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
