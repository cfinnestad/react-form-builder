import { render, screen } from '@testing-library/react';
import React from "react";
import NumberST from "./NumberST";

let props;

/* 
    For a list of custom matchers within the testing library, see the following docs:
        https://testing-library.com/docs/
        https://testing-library.com/docs/queries/byrole
        https://www.npmjs.com/package/@testing-library/jest-dom
*/

describe("NumberST", () => {
    beforeEach(() => {
        props = {
            item: {
                helperText: "Helper text to describe your field",
                id: "number1",
                label: "Number label",
                name: "number1",
                required: false,
                subtype: "Number",
                type: "Field"
            }
        };
    });

    test("Returns a non-empty React fragment", () => {
        const result = NumberST(props);
        expect(result).not.toEqual(<React.Fragment />);
    });

    test("Renders a textbox element (pattern limits to digits)", () => {
        const element = NumberST(props);
        render(element);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("Renders a non-required element", () => {
        const element = NumberST(props);
        render(element);
        expect(screen.getByRole("textbox")).not.toBeRequired();
    });

    test("Renders a required element", () => {
        props.item.required = true;
        const element = NumberST(props);
        render(element);
        expect(screen.getByRole("textbox")).toBeRequired();
    });

    test("Renders helper text", () => {
        const element = NumberST(props);
        render(element);
        expect(screen.getByText("Helper text to describe your field")).toBeInTheDocument();
    });

    test("Renders a label", () => {
        const element = NumberST(props);
        render(element);
        expect(screen.getByRole("label")).toHaveTextContent(/^Number label$/i);
    });

    test("Renders a element with a default value", () => {
        props.item.value = 5;
        const element = NumberST(props);
        render(element);
        expect(screen.getByRole("textbox")).toHaveValue("5");
    });
});