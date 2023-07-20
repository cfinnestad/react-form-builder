import React from "react";
import TextST from "./TextST";

let props;

describe("TextST", () => {
    beforeEach(() => {
        props = {
            item: {
                type: "Field",
                subtype: "Text"
            }
        };
    });

    test("Returns an empty React fragment if the field is not of type Text", () => {
        props.item.subtype = "Radio";
        const result = TextST(props);
        expect(result).toEqual(<React.Fragment />);
    });

    test("Returns a non-empty React fragment if the field is of type Text", () => {
        const result = TextST(props);
        expect(result).not.toEqual(<React.Fragment />);
    });
});