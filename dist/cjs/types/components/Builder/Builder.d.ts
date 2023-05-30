import React, { Dispatch, FC, SetStateAction } from "react";
import { ActionFC, ActionProps } from "../Actions/Actions";
import { AllowedItems } from "../Items/DefaultItems";
import { AnyItem } from "../Items";
import { AllowedSubtypes } from "../Items/Subtypes/DefaultSubTypes";
import { ErrorType } from "../Errors/Errors";
type BuilderOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
};
export type Options = {
    Actions?: FC<ActionProps>[];
    AllowedItems: AllowedItems;
    AllowedSubtypes: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    SetItem: Dispatch<SetStateAction<AnyItem>>;
    setItems: Dispatch<SetStateAction<AnyItem[]>>;
    setModal?: Dispatch<SetStateAction<JSX.Element>>;
    IsBuild: boolean;
    renderType?: 'object' | 'flatobject' | 'array' | 'flatarray';
    getError: (error: string, item: AnyItem) => string | undefined;
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
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => React.JSX.Element;
export default Builder;
