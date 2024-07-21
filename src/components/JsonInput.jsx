import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";

const JsonInput = (props) => {
  const { title, readOnly, value, onChange } = props;

  return <>
    <div className="p-0 m-0 flex flex-row justify-b">
        <Label className="mb-3 text-3xl">{title}</Label>
        { readOnly && <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Remove special characters</Label>
        </div>}
    </div>
    <AceEditor
        mode="json"
        theme='twilight'
        height='700px'
        width="auto"
        name="editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
        }}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
    />
  </>
};

export default JsonInput;
