import {EmailSubtype, Options} from "../../Items";

const EmailValidate = (item: EmailSubtype, options: Options): boolean => {
    item.errorText = undefined
    if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value && item.maxLength !== undefined && item.value.length > item.maxLength) {
        item.errorText = options.getError('maxLength', item)
    } else if (item.value && !item.value.match(/^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])$/)) {
        item.errorText = options.getError('email', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default EmailValidate