import React from 'react';
type FilterInputProps = {
    value: string | number | boolean | undefined;
    setValue: (value: string | number | boolean | undefined, index: number | undefined) => void;
    type: string;
    label?: string;
    index?: number;
    inputProps?: object;
};
declare const FilterInput: ({ value, index, setValue, type, label, inputProps }: FilterInputProps) => React.JSX.Element;
export default FilterInput;
