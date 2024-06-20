import { Dispatch, SetStateAction, JSX } from 'react';
import { AnyItem, Option, AllowedItems, AllowedSubtypes, Files } from "../Items";
import { ErrorType } from "../Errors/Errors";
import { Theme } from "@mui/material/styles";
import { SubmitButtonProps } from "../Items";
import { Accept } from "react-dropzone";
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
    submitColors?: string[];
    fileTypes: Accept;
};
declare const Render: ({ Items, SetItems, Options }: RenderProps) => JSX.Element;
export declare const RenderedObject: (items: AnyItem[], files?: Files) => {};
export declare const RenderedFlatObject: (items: AnyItem[], files?: Files) => {};
export declare const RenderedArray: (items: AnyItem[], files?: Files) => {} | [];
export declare const RenderedFlatArray: (items: AnyItem[], files?: Files) => object[];
export default Render;
