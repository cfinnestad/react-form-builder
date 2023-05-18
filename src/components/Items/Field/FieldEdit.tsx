import React, {useEffect, useState} from "react";
import {FieldItem, FieldProps, ItemProps} from "../Items";

export const FieldEdit = (FieldProps: ItemProps) => {
    const [item, setItem] = useState(FieldProps.item as FieldItem)

    useEffect(()=>{
        if (item !== FieldProps.item) {
            const itm = {...item}
            FieldProps.options.SetItem(itm)
        }
    }, [item])

    useEffect(() => {
        const itm = {...item}
        setItem(itm)
        console.log('TEST', itm)
    },[item])
    console.log('FE',FieldProps.item)
    console.log('AS',FieldProps.options.AllowedSubtypes[item.subtype])
    const data = FieldProps.options.AllowedSubtypes[item.subtype].EditFC(FieldProps as FieldProps)
    // TODO add field-level items to be edited.
    return <>
        { data }
    </>
}

export default FieldEdit