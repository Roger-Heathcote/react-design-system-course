import React, { useState, useRef, createRef, useEffect, KeyboardEventHandler } from 'react'

import Text from '../../atoms/Text'

interface SelectOption {
    label: string,
    value: string
}

interface RenderOptionProps {
    isSelected: boolean,
    option: SelectOption,
    getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
    options?: SelectOption[],
    label?: string
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
    renderOption?: (props: RenderOptionProps) => React.ReactNode,
}

const Select: React.FC<SelectProps> = ({
        options = [],
        label = "Please select an option ...",
        onOptionSelected: handler,
        renderOption,
    }) => {

        const [isOpen, setIsOpen] = useState<boolean>(false)
        const [selectedIndex, setSelectedIndex] = useState<null|number>(null)
        const [overlayTop, setOverlayTop] = useState<number>(0)
        const labelRef = useRef<HTMLButtonElement>(null)
        const firstRender = useRef(true)
        const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
        const [highlightedIndex, setHighlightedIndex] = useState<number|null>(0)

        useEffect(()=>{
            setOverlayTop((
                labelRef.current?.offsetHeight || 0
            ) -1 )
        }, [labelRef.current?.offsetHeight])

        const onOptionSelected = (option: SelectOption, optionIndex: number ) => {
            if(handler) handler(option, optionIndex)
            setSelectedIndex(optionIndex)
            setIsOpen(false)
        }

        if(selectedIndex !== null) label = options[selectedIndex].label

        const caretStyleParts = ["dse-select__caret w-6 h-6"]
        caretStyleParts.push( isOpen ? "dse-select__caret--open": "dse-select__caret--closed")
        const caretStyles = caretStyleParts.join(" ")

        const highlightOption = (optionIndex: number|null) => {
            setHighlightedIndex(optionIndex)
        }

        const onButtonKeydown: KeyboardEventHandler = (event) => {
            event.preventDefault()
            if(["Enter", " ", "ArrowDown"].includes(event.key)) {
                setIsOpen(true)
                if(selectedIndex !== null){
                    highlightOption(selectedIndex)
                } else {
                    highlightOption(0)
                }
            }
        }

        useEffect(() => {
            setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
        }, [options.length])
        
        useEffect(()=>{
            if(highlightedIndex !== null && isOpen){
                const ref = optionRefs[highlightedIndex]
                if(ref && ref.current) ref.current.focus()
            }
        }, [isOpen, highlightedIndex])

        useEffect(()=>{
            console.log("Giving focus to closed list button")
            if(firstRender.current) { firstRender.current = false; return }
            if(isOpen !== true && labelRef.current !== null) labelRef.current.focus()
        }, [isOpen])

        const onOptionKeyPressed: KeyboardEventHandler = (event) => {
            if(event.key === "Escape") {
                setIsOpen(false)
                if(labelRef.current !== null) labelRef.current.focus()
                return
            }
            if(event.key === "ArrowDown") {
                setHighlightedIndex( highlightedIndex === null ? 0 : (highlightedIndex+1) % (options.length) )
            }
            if(event.key === "ArrowUp") {
                setHighlightedIndex( !highlightedIndex ? options.length -1 : highlightedIndex-1 )
            }
            if(event.key === "Enter" || event.key === " ") {
                if(highlightedIndex !== null) onOptionSelected(options[highlightedIndex], highlightedIndex)
            }

        }

        return(
            <div className="dse-select">
                <button
                    aria-haspopup={true}
                    aria-expanded={isOpen ? true : undefined}
                    aria-controls="dse-select-list"
                    ref={labelRef}
                    className='dse-select__label'
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={onButtonKeydown}
                >
                    <Text>{label}</Text>
                    <svg className={caretStyles} width="1rem" height="1rem" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isOpen ? (
                    <ul
                        id="dse-select-list"
                        role='menu'
                        style={{ top: overlayTop }}
                        className='dse-select__overlay'
                    >
                        {options.map((option, optionIndex)=>{
                            const isSelected = selectedIndex === optionIndex
                            const isHighlighted = highlightedIndex === optionIndex

                            const ref = optionRefs[optionIndex]

                            const renderOptionProps = {
                                ref,
                                option,
                                isSelected,
                                getOptionRecommendedProps: (overrideProps = {}) => { return {
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
                                }}
                            }

                            if(renderOption) {
                                return renderOption(renderOptionProps)
                            }
                            return (
                                <li
                                    {...renderOptionProps.getOptionRecommendedProps()}
                                >
                                    <Text>
                                        {option.label}
                                    </Text>
                                    { isSelected ? (
                                        <svg width="1rem" height="1rem" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    ) : null}
                                </li>
                            )
                        })}
                    </ul>
                ) : null }
            </div>
        )
    }


export default Select


