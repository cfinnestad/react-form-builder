import React from "react";
import { AnyItem, ItemProps } from "./Items";
export type validateNameChangeResponse = {
    validName?: string;
    changeErrors?: string[];
};
export declare const getSiblingItems: (item: AnyItem, items: AnyItem[]) => AnyItem[];
export declare const getItemsHavingProp: (items: AnyItem[], prop: string, val?: string | null) => AnyItem[];
export declare const validateNameChange: (item: AnyItem, items: AnyItem[], newName?: string) => validateNameChangeResponse;
declare const EditFC: (ItemProps: ItemProps) => React.JSX.Element;
export default EditFC;
