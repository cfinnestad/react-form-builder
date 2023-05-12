import { ReactNode } from "react";
import type { PropsWithChildren } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import "./SortableItem.css";
interface Props {
    id: UniqueIdentifier;
}
export declare function SortableItem({ children, id }: PropsWithChildren<Props>): JSX.Element;
export declare function DragHandle({ children }: {
    children: ReactNode;
}): JSX.Element;
export {};
