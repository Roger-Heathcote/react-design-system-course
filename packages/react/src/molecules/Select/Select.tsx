import React, { useState, useRef, useEffect } from 'react'

interface SelectOption {
    label: string,
    value: string
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
    options?: SelectOption[],
    label?: string
}

const Select: React.FC<SelectProps> = ({
        options = [],
        label = "Please select an option ...",
        onOptionSelected: handler
    }) => {

        const [isOpen, setIsOpen] = useState<boolean>(false)
        const labelRef = useRef<HTMLButtonElement>(null)
        const [overlayTop, setOverlayTop] = useState<number>(0)

        const onLabelClick = () => {
            setIsOpen(!isOpen)
        }

        const onOptionSelected = (option: SelectOption, optionIndex: number ) => {
            if(handler) handler(option, optionIndex)
        }

        useEffect(()=>{
            setOverlayTop((
                labelRef.current?.offsetHeight || 0
            ) -1 )
        }, [labelRef.current?.offsetHeight])

        return(
            <div className="dse-select">
                <button ref={labelRef} className='dse-select__label'
                    onClick={onLabelClick}
                >
                    <span>{label}</span>
                    <svg width="1rem" height="1rem" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isOpen ? (
                    <ul style={{ top: overlayTop }} className='dse-select__overlay'>
                        {options.map((option, optionIndex)=>{
                            return (
                                <li
                                    onClick={() => onOptionSelected(option, optionIndex)}
                                    key={option.value}
                                >
                                    {option.label}
                                </li>
                            )
                        })}
                    </ul>
                ) : null }
            </div>
        )
    }


export default Select


