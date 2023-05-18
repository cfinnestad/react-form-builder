import { ItemType } from "./Items";
export type AllowedItems = {
    [key: string]: ItemType;
};
declare const DefaultItems: () => AllowedItems;
export default DefaultItems;
