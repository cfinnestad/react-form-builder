import { JSX } from "react";
import { AnyItem, Options, SubmitProps } from "../Items";
export type SubmitButtonProps = {
    items: AnyItem[];
    options: Options;
    label?: string;
    color?: string;
};
export type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element;
declare const Submit: ({ item, items, options }: SubmitProps) => JSX.Element;
export default Submit;
