import { Dispatch, SetStateAction, JSX } from 'react';
import { AnyItem, Option } from "../Items";
import { Options } from '../Builder/Builder';
import { AllowedItems } from "../Items/DefaultItems";
import { AllowedSubtypes } from "../Items/Subtypes/DefaultSubTypes";
import { ErrorType } from "../Errors/Errors";
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
    Errors?: ErrorType;
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => JSX.Element;
export declare const RenderedObject: (items: AnyItem[]) => {};
export declare const RenderedFlatObject: (items: AnyItem[]) => {};
export declare const RenderedArray: (items: AnyItem[]) => {} | [];
export declare const RenderedFlatArray: (items: AnyItem[]) => object[];
export default Render;
