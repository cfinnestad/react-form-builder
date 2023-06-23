import React, { FC } from "react";
import { AnyItem, Options } from "../Items";
export interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
export type ActionFC = FC<ActionProps>;
declare const Actions: ({ Items, Options }: ActionProps) => React.JSX.Element;
export default Actions;
