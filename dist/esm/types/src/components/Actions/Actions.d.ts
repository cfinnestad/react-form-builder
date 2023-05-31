import { Dispatch, SetStateAction } from "react";
import { AnyItem } from "../Items/Items";
import { Options } from "../Builder/Builder";
export interface ActionProps {
    Items: AnyItem[];
    Options: Options;
    SetItems: Dispatch<SetStateAction<AnyItem[]>>;
}
declare const Actions: (ActionProps: ActionProps) => JSX.Element;
export default Actions;
