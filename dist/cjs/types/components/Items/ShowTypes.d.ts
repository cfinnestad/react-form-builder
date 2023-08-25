import React from "react";
import { AnyItem, AllowedItems } from "./Items";
interface ShowTypesProps {
    AllowedItems: AllowedItems;
    addItems: (items: AnyItem[]) => void;
}
declare const ShowTypes: ({ AllowedItems, addItems }: ShowTypesProps) => React.JSX.Element;
export default ShowTypes;
