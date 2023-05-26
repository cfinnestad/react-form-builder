import {AnyItem} from "../Items";

export type ErrorType = {
    [key: string]: string,
}

const Errors = (): ErrorType => {
    return {
        required: 'Required',
        maxLength: 'Must not be longer than {maxLength} characters',
        minLength: 'Must be at least {minLength} characters',
        min: 'Value must be at least {min}',
        max: 'Value cannot be more than {max}',
        email: 'Invalid email address',
        mustCheck: 'You are required to check this',
        nan: 'Must be a valid number',
        invalidType: 'Wrong validator used for field subtype: "{subtype}"'
    }
}

export const GetError = (error: string, item: AnyItem, errors: ErrorType): string|undefined => {
    let result = errors[error] ?? "Error " + error + " is undefined";
    for (const prop in item) {
        // @ts-ignore
        result = result.replace('{' + prop + '}', item[prop])
    }
    return (result === '') ? undefined : result
}

export default Errors