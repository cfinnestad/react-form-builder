import NumberValidate from "./NumberValidate";

let item, options;

describe("Confirm validations for NumberValidate", () => {
    beforeEach(() => {
        item = {
            errorText: undefined,
            id: "",
            max: 10,
            min: 5,
            required: false,
            subtype: "Number",
            type: "Field"
        };

        options = {
            getError: (a, b) => { return "Generic error message"; }
        };
    });

    test("Item is not a number field type", () => {
        item = { ...item, subtype: "Text" };
        const result = NumberValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field is required and contains no value", () => {
        item = { ...item, required: true };
        const result = NumberValidate(item, options);
        expect(result).toBe(false);
    });

    test("Error text is undefined", () => {
        const result = NumberValidate(item, options);
        expect(result).toBe(true);
    });

    // TODO: Figure out mocking document elements so we can test value branches
});