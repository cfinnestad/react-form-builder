import { Dispatch, SetStateAction, JSX } from 'react';
import { AnyItem, Option, AllowedItems, AllowedSubtypes } from "../Items";
import { ErrorType } from "../Errors/Errors";
import { Theme } from "@mui/material/styles";
import { SubmitButtonProps } from "../Items";
export type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
};
export type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme?: Theme;
    custom?: {
        [key: string]: any;
    };
    mode?: "build" | "edit" | "render";
};
declare const Render: ({ Items, SetItems, Options }: RenderProps) => JSX.Element;
export declare const RenderedObject: (items: AnyItem[]) => {};
export declare const RenderedFlatObject: (items: AnyItem[]) => {};
export declare const RenderedArray: (items: AnyItem[]) => {} | [];
export declare const RenderedFlatArray: (items: AnyItem[]) => object[];
export default Render;
