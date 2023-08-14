import { Dispatch, FC, JSX, SetStateAction } from "react";
import { ActionFC, ActionProps } from "../Actions/Actions";
import { AllowedItems, AllowedSubtypes, AnyItem, Option, SubmitButtonProps } from "../Items";
import { ErrorType } from "../Errors/Errors";
import { Theme } from "@mui/material/styles";
export type BuilderOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
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
};
export type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderOptions;
};
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => JSX.Element;
export default Builder;
