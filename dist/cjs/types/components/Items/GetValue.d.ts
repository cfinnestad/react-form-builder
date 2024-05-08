import { FieldItem, HiddenItem } from "./Items";
declare const GetValue: (item: FieldItem | HiddenItem) => string | number | boolean | string[] | File[] | undefined;
export default GetValue;
