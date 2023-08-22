import React, { ReactNode } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import "./SortableItem.scss";
interface Props {
    id: UniqueIdentifier;
    style?: CSSProperties | undefined;
}
export declare function SortableItem({ children, id, style }: PropsWithChildren<Props>): React.JSX.Element;
export declare function DragHandle({ children }: {
    children: ReactNode;
}): React.JSX.Element;
export {};
