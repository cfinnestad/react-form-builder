import React from "react";
import { AllowedItems } from "./DefaultItems";
interface ShowTypesProps {
    AllowedItems: AllowedItems;
}
declare const ShowTypes: ({ AllowedItems }: ShowTypesProps) => React.JSX.Element;
export default ShowTypes;
