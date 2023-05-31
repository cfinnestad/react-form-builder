import { FC } from "react";
import { ActionProps } from "../Actions/Actions";
import { AllowedItems } from "../Items/DefaultItems";
import { AnyItem } from "../Items/Items";
import { AllowedSubtypes } from "../Items/Subtypes/DefaultSubTypes";
export type Options = {
    Actions?: FC<ActionProps>[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    _SetItem?: (Item: AnyItem) => void;
    _AddItem?: (Item: AnyItem, index: number, groupId?: string) => void;
};
export type BuilderProps = {
    Items?: AnyItem[];
    Options?: Options;
};
declare const Builder: ({ Items, Options }: BuilderProps) => JSX.Element;
export default Builder;
