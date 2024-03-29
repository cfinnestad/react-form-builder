import {RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject} from "./Render";
import {Button, ButtonGroup} from "@mui/material";
import ValidateFields from "../Items/ValidateFields";
import React from "react";
import {SubmitButtonProps} from "../Items";

export const Submit = ({ items, options, color }: SubmitButtonProps) => {
    return <ButtonGroup>
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    alert(JSON.stringify(RenderedObject(items), null, 4))
                }
            }}>
                SUBMIT AS OBJECT
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    alert(JSON.stringify(RenderedFlatObject(items), null, 4))
                }
            }}>
                SUBMIT AS FLAT OBJECT
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    alert(JSON.stringify(RenderedArray(items), null, 4))
                }
            }}>
                SUBMIT AS ARRAY
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    alert(JSON.stringify(RenderedFlatArray(items), null, 4))
                }
            }}>
                SUBMIT AS FLAT ARRAY
            </Button>
        }
    </ButtonGroup>
}
