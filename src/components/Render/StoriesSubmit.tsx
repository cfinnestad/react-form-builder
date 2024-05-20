import {RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject} from "./Render";
import {Button, ButtonGroup} from "@mui/material";
import ValidateFields from "../Items/ValidateFields";
import React from "react";
import {Files, SubmitButtonProps} from "../Items";

export const Submit = ({ items, options, color }: SubmitButtonProps) => {
    return <ButtonGroup>
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    const files:Files = {}
                    alert(JSON.stringify(RenderedObject(items, files), null, 4))
                    alert(JSON.stringify(files, null, 4))
                }
            }}>
                SUBMIT AS OBJECT
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    const files:Files = {}
                    alert(JSON.stringify(RenderedFlatObject(items, files), null, 4))
                    alert(JSON.stringify(files, null, 4))
                }
            }}>
                SUBMIT AS FLAT OBJECT
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    const files:Files = {}
                    alert(JSON.stringify(RenderedArray(items, files), null, 4))
                    alert(JSON.stringify(files, null, 4))
                }
            }}>
                SUBMIT AS ARRAY
            </Button>
        }
        {
            // @ts-ignore
            <Button color={color} onClick={() => {
                if(ValidateFields(items, options)) {
                    const files:Files = {}
                    alert(JSON.stringify(RenderedFlatArray(items, files), null, 4))
                    alert(JSON.stringify(files, null, 4))
                }
            }}>
                SUBMIT AS FLAT ARRAY
            </Button>
        }
    </ButtonGroup>
}
