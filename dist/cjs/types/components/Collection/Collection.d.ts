import React from 'react';
import { AnyItem } from "../Items";
type CollectionProps = {
    name: string;
    items: AnyItem[];
    addItems: (items: AnyItem[]) => void;
};
declare const Collection: ({ name, items, addItems }: CollectionProps) => React.JSX.Element;
export default Collection;
