import { JSX } from "react";
import { AnyItem, ItemProps } from "../Items";
import { Options } from "../../Builder";
export type SubmitButtonProps = {
    items: AnyItem[];
    options: Options;
    label?: string;
};
export type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element;
declare const Submit: ({ item, items, options }: ItemProps) => JSX.Element;
export default Submit;
