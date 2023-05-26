import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldProps, isPhone, PhoneSubtype} from "../../Items";
import MuiPhoneNumber from 'material-ui-phone-number';
import phoneValidate from "./PhoneValidate";

const PhoneST = (fieldProps: FieldProps ) => {
    if (!isPhone(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as PhoneSubtype)

    useEffect(()=>{
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    },[item])

    const onChange = (value: string) => {
        const itm = {...item}

        itm.value = !value ? undefined : value

        if(item.value === undefined) {
            delete item.value
        }
        phoneValidate(itm, fieldProps.options)

        setItem(itm)
    }

    return <>
        <MuiPhoneNumber defaultCountry={'us'} onChange={onChange}/>
    </>
}

export default PhoneST
