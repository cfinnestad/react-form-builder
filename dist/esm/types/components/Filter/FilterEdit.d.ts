import React from 'react';
import { FieldItem, FilterType, HiddenItem } from "../Items";
export type FilterEditProps = {
    fieldItems: (FieldItem | HiddenItem)[];
    filter: FilterType | undefined;
    setFilter: (newFilter: FilterType | undefined, index: number | undefined) => void;
    index?: number;
};
declare const FilterEdit: ({ fieldItems, filter, setFilter, index }: FilterEditProps) => React.JSX.Element;
export default FilterEdit;
