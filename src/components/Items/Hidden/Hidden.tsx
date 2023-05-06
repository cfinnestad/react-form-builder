import React from "react";
import {HiddenItem, ItemProps} from "../Items";

// TODO Use IsBuild parameter
// If true, render as text field
// If false, render as hidden field
// Still needs to render, just dont show

export const edit = () => {

    return <></>
}

const Hidden = (fieldProps: ItemProps) => {
    const item = fieldProps.Item as HiddenItem
    const isBuild = true //fieldProps.IsBuild
    // const [showHidden, setShowHidden] = useState(fieldProps.IsBuild)

    return <>
        <div className={ isBuild ? 'hidden' : undefined }>
            { item.value }
        </div>
    </>
}

export default Hidden