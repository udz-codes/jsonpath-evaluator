import * as React from "react";
import JsonInput from "./JsonInput";
import { QueryContext } from '../App';
import { JSONPath } from "jsonpath-plus";

const InputBody = () => {
    const {inputText} = React.useContext(QueryContext);
    const [jsonInputText, setJsonInputText] = React.useState();
    const [jsonOutputText, setJsonOutputText] = React.useState();

    React.useEffect(() => {
        try {
            const parsedJson = JSON.parse(jsonInputText);
            const result = JSONPath({path: inputText, json: parsedJson});
            setJsonOutputText(JSON.stringify(result, null, 4));
        } catch (e) {
            console.error(e);
            setJsonOutputText('Invalid Json Input');
        }
    }, [jsonInputText, inputText]);

    return (
        <div className='flex flex-row p-6 pt-0' style={{width: '100vw'}}>
            <div className="flex flex-col grow mr-3" style={{width: '50vw'}}>
                <JsonInput title="Input" value={jsonInputText} onChange={setJsonInputText} />
            </div>
            <div className="flex flex-col grow ml-3" style={{width: '50vw'}}>
                <JsonInput title="Output" value={jsonOutputText} readOnly={true}/>
            </div>
        </div>
    )
}

export default InputBody;