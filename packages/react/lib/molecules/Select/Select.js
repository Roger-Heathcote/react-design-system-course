import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const Select = ({ options = [], label = "Please select an option ...", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const labelRef = useRef(null);
    const firstRender = useRef(true);
    const [optionRefs, setOptionRefs] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) - 1);
    }, [labelRef.current?.offsetHeight]);
    const onOptionSelected = (option, optionIndex) => {
        if (handler)
            handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    if (selectedIndex !== null)
        label = options[selectedIndex].label;
    const caretStyleParts = ["dse-select__caret w-6 h-6"];
    caretStyleParts.push(isOpen ? "dse-select__caret--open" : "dse-select__caret--closed");
    const caretStyles = caretStyleParts.join(" ");
    const highlightOption = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeydown = (event) => {
        event.preventDefault();
        if (["Enter", " ", "ArrowDown"].includes(event.key)) {
            setIsOpen(true);
            if (selectedIndex !== null) {
                highlightOption(selectedIndex);
            }
            else {
                highlightOption(0);
            }
        }
    };
    useEffect(() => {
        setOptionRefs(options.map(_ => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex];
            if (ref && ref.current)
                ref.current.focus();
        }
    }, [isOpen, highlightedIndex]);
    useEffect(() => {
        console.log("Giving focus to closed list button");
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (isOpen !== true && labelRef.current !== null)
            labelRef.current.focus();
    }, [isOpen]);
    const onOptionKeyPressed = (event) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            if (labelRef.current !== null)
                labelRef.current.focus();
            return;
        }
        if (event.key === "ArrowDown") {
            setHighlightedIndex(highlightedIndex === null ? 0 : (highlightedIndex + 1) % (options.length));
        }
        if (event.key === "ArrowUp") {
            setHighlightedIndex(!highlightedIndex ? options.length - 1 : highlightedIndex - 1);
        }
        if (event.key === "Enter" || event.key === " ") {
            if (highlightedIndex !== null)
                onOptionSelected(options[highlightedIndex], highlightedIndex);
        }
    };
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, "aria-controls": "dse-select-list", ref: labelRef, className: 'dse-select__label', onClick: () => setIsOpen(!isOpen), onKeyDown: onButtonKeydown },
            React.createElement(Text, null, label),
            React.createElement("svg", { className: caretStyles, width: "1rem", height: "1rem", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React.createElement("ul", { id: "dse-select-list", role: 'menu', style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const renderOptionProps = {
                ref,
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        role: 'menuitemradio',
                        'aria-checked': isSelected,
                        'aria-label': option.label,
                        tabIndex: 0,
                        onKeyDown: onOptionKeyPressed,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        className: [`dse-select__option`,
                            `${isSelected ? ' dse-select__option--selected' : ""}`,
                            `${isHighlighted ? ' dse-select__option--highlighted' : ""}`
                        ].join(""),
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps
                    };
                }
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected ? (React.createElement("svg", { width: "1rem", height: "1rem", className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))) : null));
        }))) : null));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
