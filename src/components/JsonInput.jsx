"use client"
import * as React from "react"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools"

const JsonInput = (props) => {
    const { readOnly, value, onChange } = props;

    return <AceEditor
        mode="json"
        theme='twilight'
        height='700px'
        width="auto"
        readOnly={readOnly}
        value={value}
        onChange={onChange}
    />
}

export default JsonInput