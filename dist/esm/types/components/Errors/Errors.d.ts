export type ErrorType = {
    [key: string]: string;
};
declare const Errors: () => ErrorType;
export declare const GetError: (error: string, item: object, errors: ErrorType) => string | undefined;
export default Errors;
