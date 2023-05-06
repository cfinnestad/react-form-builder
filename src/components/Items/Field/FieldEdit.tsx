import React, {useEffect, useState} from "react";
import {AnySubtype, FieldItem, FieldProps} from "../Items";
import SetItem from "../SetItem";

export const FieldEdit = (FieldProps: FieldProps) => {
    const [item, setItem] = useState(FieldProps.Item as FieldItem)
    const [subtype, setSubtype] = useState(FieldProps.Item.subtype as AnySubtype)


    useEffect(()=>{
        console.log('ITEM', item)
        if (item !== FieldProps.Item) {
            const itm = {...item}
            FieldProps.SetItems(SetItem(itm, FieldProps.Items))
            console.log('ITEM', itm)
        }
    }, [item])

    useEffect(() => {
            console.log('TEST', item)
        if (subtype !== item.subtype) {
            const itm = {...item}
            itm.subtype = subtype
            setItem(itm)
            console.log('TEST', itm)
        }
    },[subtype])
    console.log('FE',FieldProps.Item)
    console.log('AS',FieldProps.AllowedSubtypes[FieldProps.Item.subtype.subtype])
    const data = FieldProps.AllowedSubtypes[FieldProps.Item.subtype.subtype].EditFC({ subtype: subtype, setSubtype: setSubtype, item })
    return <>
        { data }
    </>
}

export default FieldEdit