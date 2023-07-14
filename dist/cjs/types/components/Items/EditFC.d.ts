import React from "react";
import { AnyItem, ItemProps } from "./Items";
export type validateNameChangeResponse = {
    validName?: string;
    errors?: string[];
};
export declare const getSiblingItems: (item: AnyItem, items: AnyItem[]) => AnyItem[];
export declare const validateNameChange: (props: ItemProps, newName?: string) => validateNameChangeResponse;
declare const EditFC: (ItemProps: ItemProps) => React.JSX.Element;
export default EditFC;
