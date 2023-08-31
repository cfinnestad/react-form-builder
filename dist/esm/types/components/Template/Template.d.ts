import React from 'react';
import { AnyItem } from "../Items";
type TemplateProps = {
    name: string;
    items: AnyItem[];
    addItems: (items: AnyItem[]) => void;
};
declare const Template: ({ name, items, addItems }: TemplateProps) => React.JSX.Element;
export default Template;
