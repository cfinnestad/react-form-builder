import React, { Dispatch, SetStateAction } from 'react';
import { Option } from '../Items';
export declare enum SelectedType {
    None = 0,
    Single = 1,
    Multiple = 2
}
export type OptionsProps = {
    options: Option[];
    setOptions: Dispatch<SetStateAction<Option[]>>;
    selectedType: SelectedType;
};
export type OptionItemType = {
    id: string;
    option: Option;
};
declare const Options: ({ options, setOptions, selectedType }: OptionsProps) => React.JSX.Element;
export default Options;
