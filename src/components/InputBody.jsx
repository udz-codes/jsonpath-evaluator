import * as React from "react";
import JsonInput from "./JsonInput";
import { QueryContext } from '../App';
import { JSONPath } from "jsonpath-plus";
import { search as JMESPath } from "jmespath";

import Sample from './Sample.json';

const InputBody = () => {
    const {inputText, queryLanguage} = React.useContext(QueryContext);
    const [jsonInputText, setJsonInputText] = React.useState(JSON.stringify(Sample, null, 4));
    const [jsonOutputText, setJsonOutputText] = React.useState();

    React.useEffect(() => {
        try {
            const parsedJson = JSON.parse(jsonInputText);
            const result = queryLanguage === 'JMESPath' ? JMESPath(parsedJson, inputText) : JSONPath({path: inputText, json: parsedJson});
            setJsonOutputText(JSON.stringify(result, null, 4));
        } catch (e) {
            console.error(e);
            setJsonOutputText('Invalid Json Input');
        }
    }, [jsonInputText, inputText, queryLanguage]);

    return (
        <div className='flex flex-row p-6 pt-0' style={{width: '100vw', height: '85vh'}}>
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