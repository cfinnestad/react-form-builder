import React, {createContext, ReactNode, useContext, useMemo} from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./SortableItem.scss";

interface Props {
  id: UniqueIdentifier
  style?: CSSProperties|undefined
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {}
});

export function SortableItem({ children, id, style }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const LocalStyle: CSSProperties = {
    padding: '5px',
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
    ...style
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div className="SortableItem" ref={setNodeRef} style={LocalStyle}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

export function DragHandle({children}: {children: ReactNode}) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
      <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
        {children}
      </button>
  );
}
