import React, { Dispatch, SetStateAction } from 'react';
import { OptionItemType, SelectedType } from "./Options";
type OptionItemProps = {
    options: OptionItemType[];
    setOptions: Dispatch<SetStateAction<OptionItemType[]>>;
    optionId: string;
    selectedType: SelectedType;
};
declare const OptionItem: ({ options, setOptions, optionId, selectedType }: OptionItemProps) => React.JSX.Element;
export default OptionItem;
