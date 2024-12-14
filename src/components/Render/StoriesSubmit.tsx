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
                    alert(JSON.stringify({data: RenderedObject(items, files), files: files}, null, 4))
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
                    alert(JSON.stringify({data: RenderedFlatObject(items, files), files: files}, null, 4))
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
                    alert(JSON.stringify({data: RenderedArray(items, files), files: files}, null, 4))
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
                    alert(JSON.stringify({data: RenderedFlatArray(items, files), files: files}, null, 4))
                }
            }}>
                SUBMIT AS FLAT ARRAY
            </Button>
        }
    </ButtonGroup>
}
