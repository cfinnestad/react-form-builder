import { AnyItem, FieldItem, HiddenItem } from "./Items";
declare const GetItem: (id: string | number, items: AnyItem[]) => FieldItem | HiddenItem | undefined;
export default GetItem;
