import React, {JSX, useEffect, useRef} from "react";
import {AnyItem, Options, SubmitProps} from "../Items";
import {RenderedFlatObject} from "../../Render";
import {Button} from "@mui/material";

export type SubmitButtonProps = {
    items: AnyItem[],
    options: Options,
    label?: string,
    color?: string
}

export type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element
const Submit = ({item, items, options}: SubmitProps) => {
    const defaultSubmit = ({items, color}: SubmitButtonProps) => {
        // @ts-ignore
        return <Button type="submit" color={color} varient="contained"
                       onClick={() => alert(JSON.stringify(RenderedFlatObject(items), null, 4))}>
            {item.label}
        </Button>
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

    return <submitElement.current items={items} options={options} label={item?.label} color={item?.color ?? 'primary'}/>

}

export default Submit