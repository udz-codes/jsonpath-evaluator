import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { GoChevronDown } from "react-icons/go";
import Editor from '@monaco-editor/react';
import { RxClipboardCopy } from "react-icons/rx";
import { useToast } from "@/components/ui/use-toast"

const JsonInput = (props) => {
  const { title, readOnly, value, onChange } = props;
  const [cleanerSwitch, setCleanersSwitch] = React.useState(false);
  const [cleanedValue, setCleanedValue] = React.useState(value);
  const [removeAllSpace, setRemoveAllSpace] = React.useState(false);
  const [removeTrailingSpace, setRemoveTrailingSpace] = React.useState(true);
  const { toast } = useToast()

  const removeWhitespace = (text) => {
    const lines = text.split("\n");
    const modifiedLines = [];

    for (const line of lines) modifiedLines.push(line.trim());

    return modifiedLines.join("\n");
  };

  const cleanIt = (data) => {
    data = data.replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll(",", "")
      .replaceAll('"', "")
      .replace(/^\s*[\r\n]/gm, '');

    if (removeAllSpace) data = data.replace(/ /g, '');
    if (removeTrailingSpace) data = removeWhitespace(data);

    return data;
  };

  React.useEffect(() => {
    if (cleanerSwitch) {
      setCleanedValue(cleanIt(value));
    } else {
      setCleanedValue(value);
    }
  }, [
    cleanerSwitch,
    value,
    removeAllSpace,
    removeTrailingSpace
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleanedValue).then(() => {
      toast({
        description: "Copied to clipboard!"
      })
    }).catch(err => {
      toast({
        title: "Error copying to clipboard",
        description: err
      })
    });
  };

  return (
    <>
      <div className="p-0 m-0 flex flex-row justify-between">
        <Label className="mb-3 text-3xl">{title}</Label>
        {readOnly && (
          <div className="flex flex-row items-center">
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard()}>
              <RxClipboardCopy className='text-xl m-0 p-0'/>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                  <Button variant="ghost">
                      Filters
                      <GoChevronDown className='ml-2'/>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>Select query language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex items-center space-x-2 m-2">
                    <Switch
                      id="data-cleaner"
                      checked={cleanerSwitch}
                      onCheckedChange={() => setCleanersSwitch(!cleanerSwitch)}
                    />
                    <Label htmlFor="data-cleaner">Remove special characters</Label>
                  </div>
                  {
                    cleanerSwitch && 
                    <>
                      <div className="flex items-center space-x-2 m-2">
                        <Switch
                          id="remove-trailing-spaces"
                          checked={removeTrailingSpace}
                          onCheckedChange={() => setRemoveTrailingSpace(!removeTrailingSpace)}
                          disabled={removeAllSpace}
                        />
                        <Label htmlFor="remove-trailing-spaces">Remove trailing spaces</Label>
                      </div>
                      <div className="flex items-center space-x-2 m-2">
                        <Switch
                          id="remove-all-spaces"
                          checked={removeAllSpace}
                          onCheckedChange={() => setRemoveAllSpace(!removeAllSpace)}
                        />
                        <Label htmlFor="remove-all-spaces">Remove all spaces</Label>
                      </div>
                    </>
                  }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <Editor
        theme="vs-dark"
        height="80vh"
        language="json"
        value={cleanedValue}
        onChange={onChange}
        options={{
          readOnly: readOnly
        }}
      />
    </>
  );
};

export default JsonInput;
