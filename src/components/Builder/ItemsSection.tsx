import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {AnyItem, Options} from "../Items";
import ShowItem from "../Items/ShowItem";

export type ItemSectionsType = {
    [id: string]: AnyItem[]
}

type ItemSectionProps = {
    id: string;
    type: 'sortable'|'draggable';
    items: AnyItem[];
    itemSections: ItemSectionsType;
    options: Options;
};

export const findItemSectionContainer = (
    itemSections: ItemSectionsType,
    id: string
) => {
    return Object.keys(itemSections).find((key) =>
        itemSections[key].find((item) => item.id === id)
    );
};

const ItemsSection = ({ id, type, items, itemSections, options }: ItemSectionProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    if (type === 'draggable') {
        return <>
        </>

    }

    return ( <>
            <SortableContext
                key={id}
                id={id}
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef}>
                    {items.map(item => <ShowItem key={item.id} item={item} items={items} itemSections={itemSections} options={options}/>)}
                </div>
            </SortableContext>
        </>
    );
};

export default ItemsSection;
