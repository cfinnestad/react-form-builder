import { Dispatch, SetStateAction } from "react";
import { AnyItem } from "../Items/Items";
type UpdateItemProps = {
    Item: AnyItem;
    Items: AnyItem[];
    SetItems: Dispatch<SetStateAction<AnyItem[]>>;
};
declare const UpdateItem: ({ Item, Items, SetItems }: UpdateItemProps) => void;
export default UpdateItem;
