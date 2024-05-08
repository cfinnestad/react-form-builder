import { isFile, FieldItem, Options } from "../../Items";
const FileValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById('render_'+item.id)
    if (element === undefined) {
        // TODO: how are we to test this?
        console.log('Could not find element by ID')
    }
    // @ts-ignore
    item.value = item.value ?? document.getElementById('render_'+item.id)?.value
    item.errorText = undefined
    if (!isFile(item)) {
        item.errorText = options.getError('invalidType', item)
    } else if (item.required && !item.value?.length) {
        item.errorText = options.getError('required', item)
    } else if ((item.value?.length ?? 0) > (item.maxFiles ?? 1)) {
        item.errorText = options.getError('maxFiles', item)
    } else if (item.value){
        item.value.map((file) => {
            if (file.size > item.maxSizeBytes) {
                item.errorText = options.getError('maxSizeBytes', file)
            // } else if(item.fileTypes != undefined && !item.fileTypes.hasOwnProperty(file.type)) {
            //     item.errorText = options.getError('invalidFileType', file)
            }
        })

    }

    if (item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default FileValidate