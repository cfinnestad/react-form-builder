import React, {useCallback, useEffect, useState} from 'react'
import {ErrorCode, FileError, FileRejection, useDropzone} from 'react-dropzone'
import {
    Card,
    FormControl,
    FormHelperText,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import {FileProps, FileSubtype} from '../../Items';
import FileValidate from "./FileValidate";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {getExtensions, getFilesTypes} from "./FileTypes";

function FileST({item, options}: FileProps) {
    // const theme = useTheme();
    const [accepted, setAccepted] = useState<File[]>([])
    const [rejected, setRejected] = useState<FileRejection[]>([])

    const onDrop = useCallback((acceptedFiles: File[], fileRejections : FileRejection[]) => {
        console.log('Dropped Accepted', acceptedFiles)
        console.log('Dropped Rejected', fileRejections)
        console.log('Current Accepted', accepted)
        const rejections = [...fileRejections]
        if (acceptedFiles.length) {
            const files = [
                ...accepted,
                ...acceptedFiles
            ]
            if (files.length > item.maxFiles) {
                const badFiles = files.slice(item.maxFiles, 9e9)
                console.log('Bad Files', badFiles)
                badFiles.map(file => {
                    rejections.push({file: file, errors: [{message: 'Too many files', code: ErrorCode.TooManyFiles} as FileError]} as FileRejection)
                })
                console.log('new Rejections', rejections)
                files.splice(item.maxFiles, 9e9)
                console.log('New Accepted', files)
            }
            console.log('files',files)
            setAccepted(files)
        }
        console.log('new Rejections2', rejections)
        setRejected(rejections)
        // if (rejections.length) {
            // setRejected(previousFiles => [
            //     ...previousFiles,
            //     ...rejections
            // ])
        // }
    }, [accepted, rejected])

    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        maxSize: item.maxSizeBytes,
        onDrop,
        accept: getFilesTypes(item.fileTypes)
    });

    const removeFile = (name : string) => {
        console.log('Removing',name)
        console.log('from',accepted)
        setAccepted(files => files.filter(file => file.name !== name))
    }
    const removeRejectedFile = (name : string) => {
        console.log('Removing',name)
        console.log('from',rejected)
        setRejected(rejected.filter(fileRejection => fileRejection.file.name !== name))
    }

    useEffect(() => {
        if (accepted.length == (item.value?.length ?? 0)) return
        console.log('Set Accepted Files',accepted)
        const itm = {...item}
        if (accepted.length == 0) {
            delete itm.value
        } else {
            itm.value = accepted
        }
        FileValidate(itm, options)
        console.log('accepted Item', itm)
        options.SetItem(itm)
    }, [accepted])

    useEffect(() => {
        console.log('set Rejected', rejected)
    }, [rejected])

    const fileError = (fileError: FileError, file: File, item: FileSubtype) => {
        switch (fileError.code) {
            case ErrorCode.TooManyFiles:
                return 'Cannot upload more than ' + item.maxFiles + ' files.'
            case ErrorCode.FileInvalidType:
                return 'Not a valid file type to upload. Must be of type ' + getExtensions(item?.fileTypes ?? ['Undefined']).join(', ') +'.'
            default:
                return fileError.message
        }
    }

    const acceptedFileItems = accepted.map((file, index) => (
        <ListItem
            key = {index}
            sx={{padding: 0}}
        >
            <ListItemIcon
                aria-label="delete"
                onClick={() => removeFile(file.name)}
                sx={{minWidth: '30px'}}
            >
                <DeleteForeverOutlinedIcon color={"error"}/>
            </ListItemIcon>
            <ListItemText
                primary={file.name}
                secondary={file.size + ' bytes'}
            />
        </ListItem>
    ));

    const fileRejectionItems = rejected.map((fileRejection, index) => {
        return (
            <ListItem
                key = {index}
                sx={{padding: 0}}
            >
                <ListItemIcon
                    aria-label="delete"
                    onClick={() => removeRejectedFile(fileRejection.file.name)}
                    sx={{minWidth: '30px'}}
                >
                    <DeleteForeverOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                    primary={fileRejection.file.name}
                    secondary={<><p>{fileRejection.file.size + ' bytes'}</p> {fileRejection.errors.map(e => <p>
                        <FormHelperText error={true}>{fileError(e,fileRejection.file,item)}</FormHelperText>
                    </p>)} </>}
                />
            </ListItem>
        )
    });

    return <Stack spacing={.5}>
        <InputLabel
            required = {item.required ?? false}
            error={item.errorText !== undefined}
        >
            {item.label}
        </InputLabel>
        <FormControl sx={{ minWidth: 250 }}>
            <Card {...getRootProps({style: {cursor: "cell", margin: "3px", padding: "2px"}})}>
                <input {...getInputProps()} />
                <Typography dangerouslySetInnerHTML={{__html: item.content}}/>
            </Card>
        </FormControl>
        <FormHelperText error={item.errorText !== undefined}>
            {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
            {item.errorText}
        </FormHelperText>
        <Stack spacing={.1}>
        {accepted.length > 0 ? <>
            <h2>Files</h2>
            <List>
                {acceptedFileItems}
            </List>
        </> : <></>}
        {rejected.length > 0 ? <>
            <h2>Rejected Files</h2>
            <List>
                {fileRejectionItems}
            </List>
        </> : <></>}
        </Stack>
    </Stack>
}

export default FileST;