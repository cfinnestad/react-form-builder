import React, {useEffect, useState, useRef} from "react";
import {HTMLItem, HTMLProps} from "../Items";
import {Editor} from "@tinymce/tinymce-react";

const HtmlEdit = ({item, options}: HTMLProps) => {
    const [stateItem, setStateItem] = useState(item)

    const editorRef = useRef(null);

    useEffect( ()=>{
        options.SetItem(stateItem)
    }, [stateItem])

    const onChange = (content: string) => {
        const val = content
        const itm = {...stateItem} as HTMLItem

        itm.content = val
        setStateItem(itm)
    }

    return (
        <>
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
                onEditorChange={onChange as any}
                value={stateItem.content as any}
            />
        </>
    );
}

export default HtmlEdit