import { AnyItem } from "../Items/Items";
import { Options } from "./Builder";
import { DragEndEvent } from "@dnd-kit/core";
declare const onDragEnd: (result: DragEndEvent, items: AnyItem[], options: Options) => void;
export default onDragEnd;
