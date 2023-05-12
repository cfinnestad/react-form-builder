import React, { Dispatch, SetStateAction } from 'react';
import { AnyItem } from "../Items/Items";
import { AllowedItems } from "../Items/DefaultItems";
import { AllowedSubtypes } from "../Items/Subtypes/DefaultSubTypes";
export type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
    Submit: ({ Items }: {
        Items: [] | {};
    }) => JSX.Element;
};
type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray';
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => React.JSX.Element;
export default Render;
