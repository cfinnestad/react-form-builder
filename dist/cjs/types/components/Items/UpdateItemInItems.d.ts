import { AnyItem } from "./Items";
type ChangedItemIds = {
    oldId: string;
    newId: string;
};
export declare const updateChildItemsInItems: (items: AnyItem[], changedItemIds: ChangedItemIds[], prefix: string) => void;
declare const UpdateItemInItems: (item: AnyItem, items: AnyItem[], prefix?: string, useIndex?: boolean) => void;
export default UpdateItemInItems;
