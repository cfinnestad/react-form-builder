import React, { Dispatch, FC, SetStateAction } from "react";
import { ActionFC, ActionProps } from "../Actions/Actions";
import { AllowedItems, AllowedSubtypes, AnyItem, Option } from "../Items";
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
    muiTheme?: Theme;
};
export type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderOptions;
    custom?: {
        [key: string]: any;
    };
};
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => React.JSX.Element;
export default Builder;
