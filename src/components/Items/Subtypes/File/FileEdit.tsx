import React, {ChangeEvent, useEffect, useRef} from "react";
import {FileProps, FileSubtype, HTMLItem, NumberSubtype} from "../../Items";
import {
    TextField,
    FormGroup,
    Select,
    Box,
    Chip,
    MenuItem, FormControl, SelectChangeEvent, Badge
} from "@mui/material";
import ShowErrors from "../ShowErrors";
import {FileTypes, isValidType} from "./FileTypes";
import {useTheme} from "@mui/material/styles";
import {isArray} from "lodash";
import {Editor} from "@tinymce/tinymce-react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

export const FileEdit = ({item, options, errorHandler}: FileProps ) => {
    const theme = useTheme();
    const editorRef = useRef(null);

    const onChangeContent = (content: string) => {
        options.SetItem({...item, content: content})
    }
    const onChangeMaxFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const maxFiles = event.target.value === '' ? 1 : parseInt(event.target.value)

        if (maxFiles && isNaN(+maxFiles)) {
            errorHandler.setError('maxFiles', 'Max Files must be an integer!')
        } else if (maxFiles > 10) {
            errorHandler.setError('maxFiles', 'Max Files must not be larger than 10')
        } else {
            const itm = {...item, maxFiles: maxFiles}
            errorHandler.setError('maxFiles')
            options.SetItem(itm)
        }

    }

    const onChangeMaxSizeBytes = (event: ChangeEvent<HTMLInputElement>) => {
        const maxSizeBytes = parseInt(event.target.value)
        const itm = {...item}

        if (isNaN(+maxSizeBytes)) {
            errorHandler.setError('maxSizeBytes', 'Max Size Bytes must be an integer!')
        }
        else if (maxSizeBytes <= 0) {
            errorHandler.setError('maxSizeBytes', 'Max Size Bytes must be greater than zero!')
        }
        else if (maxSizeBytes > 16777215) {
            errorHandler.setError('maxSizeBytes', 'Max Size Bytes must not exceed 16,777,215 bytes!')
        }
        else {
            errorHandler.setError('maxSizeBytes')
            const itm = { ...item, maxSizeBytes: maxSizeBytes } as FileSubtype;
            options.SetItem(itm);
        }
    }

    const onChangeFileTypes = (selected: SelectChangeEvent<string[]>) => {
        const itm = {...item}

        const fileTypes = isArray(selected.target.value) ? selected.target.value : [selected.target.value]
        var valid = true
        fileTypes.map(type => {
            if (!isValidType(type, options)) {
                errorHandler.setError('filesTypes', 'Invalid File Type selected')
                valid = false
            }
        })
        if (valid) {
            errorHandler.setError('filesTypes')
            const itm = { ...item, fileTypes: fileTypes } as FileSubtype;
            options.SetItem(itm);
        }
    }

    return <>
        <FormGroup>
            <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                init={{
                    promotion: false,
                    font_css: '/css/fonts.css',
                    font_family_formats: 'Gotham Light=Gotham-Light; Gotham Book=Gotham-Book; Gotham Medium=Gotham-Medium; Trailblazer Light=Trailblazer-Light; Trailblazer Bold=Trailblazer-Bold; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
                    plugins: 'image link code',
                    toolbar: [
                        { name: 'history', items: [ 'undo', 'redo' ] },
                        { name: 'styles', items: [ 'styles' ] },
                        { name: 'formatting', items: [ 'bold', 'italic' ] },
                        { name: 'plugins', items: [ 'image', 'link', 'code'] },
                        { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                        { name: 'indentation', items: [ 'outdent', 'indent' ] }
                    ],
                    menubar: 'edit view insert format',
                    content_style: 'body { font-family: Gotham-Book; }',
                    link_assume_external_targets: true,
                    link_target_list: [
                        { text: 'Current window', value: '_top' },
                        { text: 'New window', value: '_blank' }
                    ]
                } as any}
                onInit={(evt: any, editor: any) => editorRef.current = editor}
                onEditorChange={onChangeContent as any}
                value={item.content as any}
            />
        </FormGroup>
        <FormGroup>
            <TextField
                size='small'
                label='Max Files'
                type="number"
                error={errorHandler.hasError('maxFiles')}
                defaultValue={item.maxFiles}
                onChange={onChangeMaxFiles}
            />
            <ShowErrors errors={errorHandler.getError('maxFiles')}/>
        </FormGroup>

        <FormGroup>
            <TextField
                size='small'
                label='Max Size Bytes'
                type="number"
                error={errorHandler.hasError('maxSizeBytes')}
                defaultValue={item.maxSizeBytes}
                onChange={onChangeMaxSizeBytes}
            />
            <ShowErrors errors={errorHandler.getError('maxSizeBytes')}/>
        </FormGroup>

        <FormGroup>
            <FormControl sx={{ minWidth: 250 }}>
                <Select
                    id={item.id}
                    multiple={true}
                    value={item.fileTypes ?? []}
                    autoWidth
                    error={errorHandler.hasError('fileTypes')}
                    onChange={onChangeFileTypes}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={FileTypes[value].join(', ')} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    disabled={(!item.editable && options.Mode==="edit")}
                >
                    {Object.keys(FileTypes).map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                            selected={item.fileTypes?.includes(type)}
                        >
                            {FileTypes[type].join(', ')}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
            <ShowErrors errors={errorHandler.getError('fileTypes')}/>
        </FormGroup>

    </>

}

export default FileEdit