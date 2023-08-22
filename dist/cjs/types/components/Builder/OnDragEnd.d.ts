import { AnyItem } from "../Items";
import { DragEndEvent } from "@dnd-kit/core";
import { DragItem } from "../Items/findDragItem";
import { BuilderOptions } from "./Builder";
export declare const updateItems: (list: AnyItem[], containerId: string | number, listPart: AnyItem[]) => AnyItem[];
export declare const fixItemName: (item: AnyItem, overRef: DragItem) => AnyItem;
declare const onDragEnd: (result: DragEndEvent, items: AnyItem[], options: BuilderOptions) => void;
export default onDragEnd;
