import React, { Dispatch, SetStateAction } from "react";
import { AnyItem } from "../Items";
import { RenderOptions } from "../Render";
export type EditorProps = {
    Data: {
        [key: string]: any;
    };
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
};
declare const Editor: ({ Data, Items, SetItems, Options }: EditorProps) => React.JSX.Element;
export declare const setDefaults: (items: AnyItem[], data: object) => AnyItem[];
export default Editor;
