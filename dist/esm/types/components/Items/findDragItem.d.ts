import { AnyItem } from "./Items";
export type DragItem = {
    item: AnyItem;
    index: number;
    items: AnyItem[];
    groupId: string | number;
};
declare const findDragItem: (id: string | number, items: AnyItem[], groupId: string | number) => DragItem | undefined;
export default findDragItem;
