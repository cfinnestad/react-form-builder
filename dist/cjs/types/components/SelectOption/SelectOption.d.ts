import React, { Dispatch, SetStateAction } from 'react';
type SelectOptionProps = {
    id: string;
    option: string | undefined;
    setOption: Dispatch<SetStateAction<string | undefined>>;
    options: string[];
    label: string;
    none?: string;
};
declare const SelectOption: ({ id, option, setOption, options, label, none }: SelectOptionProps) => React.JSX.Element;
export default SelectOption;
