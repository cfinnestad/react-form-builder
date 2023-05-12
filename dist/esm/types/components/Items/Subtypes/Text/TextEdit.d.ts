import React, { Dispatch, SetStateAction } from "react";
import { FieldItem, TextSubtype } from "../../Items";
type TextEditProps = {
    subtype: TextSubtype;
    setSubtype: Dispatch<SetStateAction<TextSubtype>>;
    item: FieldItem;
};
export declare const TextEdit: ({ subtype, setSubtype, item }: TextEditProps) => React.JSX.Element;
export default TextEdit;
