import React from 'react';
interface SelectOption {
    label: string;
    value: string;
}
interface RenderOptionProps {
    isSelected: boolean;
    option: SelectOption;
    getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
interface SelectProps {
    options?: SelectOption[];
    label?: string;
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    renderOption?: (props: RenderOptionProps) => React.ReactNode;
}
declare const Select: React.FC<SelectProps>;
export default Select;
