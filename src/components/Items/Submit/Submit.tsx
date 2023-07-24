import React, {JSX, useEffect, useRef} from "react";
import {AnyItem, Options, SubmitProps} from "../Items";
import {RenderedFlatObject} from "../../Render";
import {Button} from "@mui/material";

export type SubmitButtonProps = {
    items: AnyItem[],
    options: Options,
    label?: string
}

export type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element
const Submit = ({item, items, options}: SubmitProps) => {
    const defaultSubmit = ({items}: SubmitButtonProps) => {
        return <>
            <Button type="submit" onClick={ () => alert(JSON.stringify(RenderedFlatObject(items), null, 4)) }>{item.label}</Button>
        </>
    }

    const submitElement = useRef<SubmitButtonElement>(defaultSubmit)

    useEffect(() => {
        if (item.submitElementName != null) {
            if (options.submitElements?.[item.submitElementName] != null) {
                submitElement.current = options.submitElements?.[item.submitElementName]
            } else {
                console.warn(`unable to find element ${item.submitElementName} in 'selectElements'. Using default`)
            }
        }
    }, [])

    return <>
        <submitElement.current items={items} options={options} label={item?.label}></submitElement.current>
    </>

}

export default Submit