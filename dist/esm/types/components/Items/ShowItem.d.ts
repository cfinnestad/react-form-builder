import React from "react";
import { ItemProps } from "./Items";
type ShowItemsProps = ItemProps & {
    key?: string | number;
};
export declare const ShowItem: ({ item, items, options }: ShowItemsProps) => React.JSX.Element;
export default ShowItem;
