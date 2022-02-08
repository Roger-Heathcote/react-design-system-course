import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40
};
const Select = ({ options = [], label = "Please select an option ...", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const labelRef = useRef(null);
    const onOptionSelected = (option, optionIndex) => {
        if (handler)
            handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) - 1);
    }, [labelRef.current?.offsetHeight]);
    if (selectedIndex !== null)
        label = options[selectedIndex].label;
    const caretStyleParts = ["dse-select__caret w-6 h-6"];
    caretStyleParts.push(isOpen ? "dse-select__caret--open" : "dse-select__caret--closed");
    const caretStyles = caretStyleParts.join(" ");
    const onButtonKeydown = (event) => {
        event.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
        }
    };
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, "aria-controls": "dse-select-list", ref: labelRef, className: 'dse-select__label', onClick: () => setIsOpen(!isOpen), onKeyDown: onButtonKeydown },
            React.createElement(Text, null, label),
            React.createElement("svg", { className: caretStyles, width: "1rem", height: "1rem", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React.createElement("ul", { id: "dse-select-list", role: 'menu', style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            if (renderOption) {
                return renderOption({
                    option,
                    isSelected,
                    getOptionRecommendedProps: (overrideProps = {}) => {
                        return {
                            className: `dse-select__option${isSelected ? ' dse-select__option--selected' : ""}`,
                            onClick: () => onOptionSelected(option, optionIndex),
                            key: option.value,
                            ...overrideProps
                        };
                    }
                });
            }
            return (React.createElement("li", { className: `dse-select__option${isSelected ? ' dse-select__option--selected' : ""}`, onClick: () => onOptionSelected(option, optionIndex), key: option.value },
                React.createElement(Text, null, option.label),
                isSelected ? (React.createElement("svg", { width: "1rem", height: "1rem", className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))) : null));
        }))) : null));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
