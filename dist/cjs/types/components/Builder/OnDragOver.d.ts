import { DragOverEvent } from "@dnd-kit/core";
import { AnyItem } from "../Items";
import { BuilderOptions } from "./Builder";
declare const OnDragOver: ({ active, over }: DragOverEvent, items: AnyItem[], options: BuilderOptions) => void;
export default OnDragOver;
