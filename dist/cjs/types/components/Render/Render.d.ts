import { Dispatch, SetStateAction, JSX } from 'react';
import { AnyItem } from "../Items/Items";
import { Options } from '../Builder/Builder';
import { AllowedItems } from "../Items/DefaultItems";
import { AllowedSubtypes } from "../Items/Subtypes/DefaultSubTypes";
export type SubmitProps = {
    items: AnyItem[];
    options: Options;
    results: Array<Object> | Object;
};
export type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
    Submit: (props: SubmitProps) => JSX.Element;
};
export type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray';
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => JSX.Element;
export default Render;
