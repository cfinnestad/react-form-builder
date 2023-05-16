import React from "react";
import { AnyItem } from "./Items";
import { Options } from "../Builder/Builder";
type ShowItemsProps = {
    Items: AnyItem[];
    Options: Options;
    type: string;
};
declare const ShowItems: ({ Items, Options, type }: ShowItemsProps) => React.JSX.Element;
export default ShowItems;
