import React, { Dispatch, SetStateAction } from 'react';
import { OptionItemType } from "./Options";
type OptionItemProps = {
    options: OptionItemType[];
    setOptions: Dispatch<SetStateAction<OptionItemType[]>>;
    optionId: string;
};
declare const OptionItem: ({ options, setOptions, optionId }: OptionItemProps) => React.JSX.Element;
export default OptionItem;
