import { Dispatch, FC, JSX, SetStateAction } from "react";
import { ActionFC, ActionProps } from "../Actions/Actions";
import { AllowedItems, AllowedSubtypes, AnyItem, Option, Options, SubmitButtonProps } from "../Items";
import { ErrorType } from "../Errors/Errors";
import { Theme } from "@mui/material/styles";
export declare const activeStyle: {
    backgroundColor: string;
};
export declare const MAIN = "-Main-";
export declare const TYPES = "-Types-";
import { Accept } from "react-dropzone";
export type CollectionType = {
    name: string;
    items: AnyItem[];
};
export type ActiveType = {
    id: string | undefined;
    groupId: string;
};
export type BuilderUseOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
    collections?: CollectionType[];
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme?: Theme;
    mode: string;
    custom?: {
        [key: string]: any;
    };
    submitColors?: string[];
    fileTypes?: Accept;
};
export type ModalProps = {
    item: AnyItem;
    inList?: boolean;
};
export type BuilderOptions = Options & {};
export type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderUseOptions;
};
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => JSX.Element;
export default Builder;
