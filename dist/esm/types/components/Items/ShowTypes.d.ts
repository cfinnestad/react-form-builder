import React from "react";
import { AllowedItems } from "./Items";
interface ShowTypesProps {
    AllowedItems: AllowedItems;
}
declare const ShowTypes: ({ AllowedItems }: ShowTypesProps) => React.JSX.Element;
export default ShowTypes;
