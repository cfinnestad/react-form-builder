import React, {useEffect, useState} from "react";
import {AnySubtype, FieldItem, FieldProps} from "../Items";

export const FieldEdit = (FieldProps: FieldProps) => {
    const [item, setItem] = useState(FieldProps.item as FieldItem)
    const [subtype, setSubtype] = useState(FieldProps.item.subtype as AnySubtype)


    useEffect(()=>{
        if (item !== FieldProps.item) {
            const itm = {...item}
            FieldProps.options.SetItem(itm)
        }
    }, [item])

    useEffect(() => {
        if (subtype !== item.subtype) {
            const itm = {...item}
            itm.subtype = subtype
            setItem(itm)
            console.log('TEST', itm)
        }
    },[subtype])
    console.log('FE',FieldProps.item)
    console.log('AS',FieldProps.options.AllowedSubtypes[FieldProps.item.subtype.subtype])
    const data = FieldProps.options.AllowedSubtypes[FieldProps.item.subtype.subtype].EditFC({ subtype: subtype, setSubtype: setSubtype, item })
    return <>
        { data }
    </>
}

export default FieldEdit