"use client"
import * as React from "react"
import { Label } from "@/components/ui/label"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools"

const InputBody = () => {

    return (
        <div className='flex flex-row p-6 pt-0'>
            <div className="flex flex-col grow">
                <Label className="mb-3 text-3xl">Input</Label>
                <AceEditor
                    mode="json"
                    theme='twilight'
                    height='700px'
                    width="auto"
                />
            </div>
            <div className="flex flex-col grow ml-6">
                <Label className="mb-3 text-3xl">Output</Label>
                <AceEditor
                    mode="json"
                    theme="twilight"
                    height='700px'
                    readOnly='true'
                    width="auto"
                />
            </div>
        </div>
    )
}

export default InputBody