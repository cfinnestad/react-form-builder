import React from 'react';
import { Option, OptionSubtype, Options as BuildOptions } from '../Items';
export declare enum SelectedType {
    None = 0,
    Single = 1,
    Multiple = 2
}
export type OptionsProps = {
    item: OptionSubtype;
    options: BuildOptions;
    selectedType?: SelectedType;
    useSearchableOptions?: boolean;
    useMultiples?: boolean;
};
export type OptionItemType = {
    id: string;
    option: Option;
};
declare const Options: ({ item, options, selectedType, useSearchableOptions, useMultiples }: OptionsProps) => React.JSX.Element;
export default Options;
