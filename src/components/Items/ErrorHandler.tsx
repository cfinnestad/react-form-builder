import {BuildErrors} from "../Items";
import {Dispatch, SetStateAction} from "react";

/*
// couldn't get this working for some reason, but may be unnecessary
export type ErrorHandlerType = {
    setError: (which: string, msg: string | undefined) => void,
    clearError: (which: string) => void,
    clearAllErrors: () => void,
    hasError: (which: string) => boolean,
    hasSharedError: (which: string) => boolean,
    hasAnyErrors: () => boolean,
    getError: (which: string) => string[],
    getAllErrors: () => BuildErrors[],
    fieldToTitle: (which: string) => string,
}
*/

const ErrorHandler = (errors: BuildErrors[], setErrors: Dispatch<SetStateAction<BuildErrors[]>>) : any => {
    // we need a local copy for staging and immediate availability
    let localErrors = {...errors} as BuildErrors[]

    // internal helper to standardize typescript checks
    const getVal = (which: string): string | undefined => {
        if (!hasAnyErrors()) return undefined
        else return (localErrors as any)[which as keyof typeof localErrors]
    }

    // assign incoming error to master error store
    const setError = (which: string, msg: string | undefined = undefined) => {
        if (msg === undefined) delete localErrors[which as keyof typeof localErrors]
        else Object.assign(localErrors, { [which]: [msg] })
        setErrors(localErrors)
    }

    // optional set alias for readability
    const clearError = (which: string) => {
        setError(which)
    }

    // clean slate
    const clearAllErrors = () => {
        localErrors = [] as BuildErrors[]
        setErrors(localErrors)
    }

    // error flag for field prop
    const hasError = (which: string): boolean => {
        return (localErrors && getVal(which) !== undefined)
    }

    // some error combinations need to implement a shared message while highlighting the field
    const hasSharedError = (which: string): boolean => {
        const val = getVal(which)
        return (localErrors && val !== undefined && val[0] === "")
    }

    // whether any fields are currently in error state
    const hasAnyErrors = (): boolean => {
        return (localErrors && Object.keys(localErrors).length > 0)
    }

    // obtain the error for show errors component
    const getError = (which: string): (string | undefined)[] => {
        return (localErrors && getVal(which) !== undefined) ? [getVal(which)] : []
    }

    // return everything flagged
    const getAllErrors = (): BuildErrors[] => {
        return localErrors
    }

    // convert a camel case field name to a title case string
    const fieldToTitle = (which: string): string => {
        return [...which].map(function(c, i) {
            if (i === 0) return c.toUpperCase()
            else if (c === c.toUpperCase()) return " " + c
            else return c
        }).join("")
    }

    return {
        setError: setError,
        clearError: clearError,
        clearAllErrors: clearAllErrors,
        hasError: hasError,
        hasSharedError: hasSharedError,
        hasAnyErrors: hasAnyErrors,
        getError: getError,
        getAllErrors: getAllErrors,
        fieldToTitle: fieldToTitle
    } as any
}

export default ErrorHandler