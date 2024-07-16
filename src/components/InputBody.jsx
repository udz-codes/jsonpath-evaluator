"use client"
import * as React from "react"
import { Label } from "@/components/ui/label"
import JsonInput from "./JsonInput";
import {QueryContext} from '../App'
import { JSONPath } from "jsonpath-plus";

const InputBody = () => {
    const {inputText} = React.useContext(QueryContext)
    const [jsonInputText, setJsonInputText] = React.useState();
    const [jsonOutputText, setJsonOutputText] = React.useState();
 
    React.useEffect(() => {
        try {
            let result = JSONPath({path: inputText, json: jsonInputText});
            console.log(result);
            setJsonOutputText(result);
        } catch (e) {
            console.log(e);
        }
    })

    return (
        <div className='flex flex-row p-6 pt-0'>
            <div className="flex flex-col grow">
                <Label className="mb-3 text-3xl">Input</Label>
                <JsonInput value={jsonInputText} onChange={setJsonInputText}/>
            </div>
            <div className="flex flex-col grow ml-6">
                <Label className="mb-3 text-3xl">Output</Label>
                <JsonInput value={jsonOutputText} readOnly={true}/>
            </div>
        </div>
    )
}

export default InputBody