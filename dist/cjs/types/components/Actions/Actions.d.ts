import { FC } from "react";
import { AnyItem } from "../Items/Items";
import { Options } from "../Builder/Builder";
export interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
export type ActionFC = FC<ActionProps>;
declare const Actions: ({ Items, Options }: ActionProps) => JSX.Element;
export default Actions;
