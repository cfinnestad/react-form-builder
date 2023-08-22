import { AnyItem, FieldItem, HiddenItem } from "./Items";
declare const GetNamedItem: (id: string | number, items: AnyItem[]) => FieldItem | HiddenItem | undefined;
export default GetNamedItem;
