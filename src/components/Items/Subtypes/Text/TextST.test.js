import { render, screen } from '@testing-library/react';
import React from "react";
import TextST from "./TextST";

let props;

/* 
    For a list of custom matchers within the testing library, see the following docs:
        https://testing-library.com/docs/
        https://testing-library.com/docs/queries/byrole
        https://www.npmjs.com/package/@testing-library/jest-dom
*/

describe("TextST", () => {
    beforeEach(() => {
        props = {
            item: {
                helperText: "Helper text to describe your field",
                id: "text1",
                label: "Text label",
                name: "text1",
                required: false,
                subtype: "Text",
                type: "Field"
            }
        };
    });

    test("Returns a non-empty React fragment", () => {
        const result = TextST(props);
        expect(result).not.toEqual(<React.Fragment />);
    });

    test("Renders a textbox element", () => {
        const element = TextST(props);
        render(element);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("Renders a non-required textbox element", () => {
        const element = TextST(props);
        render(element);
        expect(screen.getByRole("textbox")).not.toBeRequired();
    });

    test("Renders a required textbox element", () => {
        props.item.required = true;
        const element = TextST(props);
        render(element);
        expect(screen.getByRole("textbox")).toBeRequired();
    });

    test("Renders helper text", () => {
        const element = TextST(props);
        render(element);
        expect(screen.getByText("Helper text to describe your field")).toBeInTheDocument();
    });

    test("Renders a label", () => {
        const element = TextST(props);
        render(element);
        expect(screen.getByRole("label")).toHaveTextContent(/^Text label$/i);
    });

    test("Renders a textbox element with a default value", () => {
        props.item.value = "Some value";
        const element = TextST(props);
        render(element);
        expect(screen.getByRole("textbox")).toHaveValue("Some value");
    });
});