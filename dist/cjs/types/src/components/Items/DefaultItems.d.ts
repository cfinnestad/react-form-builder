import { ItemType } from "./Items";
import { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";
export type AllowedItems = {
    [key: string]: ItemType;
};
declare const DefaultItems: (allowedSubtypes: AllowedSubtypes) => AllowedItems;
export default DefaultItems;
