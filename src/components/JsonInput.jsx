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
import { TooltipProvider } from "@/components/ui/tooltip"
import TooltipButton from './TooltipButton'
import { GoChevronDown } from "react-icons/go";
import Editor from '@monaco-editor/react';
import { RxClipboardCopy, RxUpload } from "react-icons/rx";
import { useToast } from "@/components/ui/use-toast"
import { SpreadsheetContext } from "./SpreadsheetContext"

const JsonInput = (props) => {
  const { title, readOnly, value, onChange } = props;
  const { spreadSheetData, setSpreadSheetData } = React.useContext(SpreadsheetContext);
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

  const pushToSheet = () => {
    const lines = cleanedValue.split("\n");

    setSpreadSheetData(prevData => {
        let spreadSheetData = [...prevData];

        // Track if an empty column is found and is not between used columns
        let emptyColumnIndex = -1;

        for (let col = 0; col < spreadSheetData[0].length; col++) {
            let isEmptyColumn = true;

            for (let row = 0; row < spreadSheetData.length; row++) {
                if (spreadSheetData[row][col].value) {
                    isEmptyColumn = false;
                    break;
                }
            }

            if (isEmptyColumn) {
                let prevColumnUsed = col > 0 && spreadSheetData.some(row => row[col - 1].value);
                let nextColumnUsed = col < spreadSheetData[0].length - 1 && spreadSheetData.some(row => row[col + 1].value);

                if (!prevColumnUsed || !nextColumnUsed) {
                    emptyColumnIndex = col;
                    break;
                }
            }
        }

        // If no suitable empty column is found, add a new column
        if (emptyColumnIndex === -1) {
            emptyColumnIndex = spreadSheetData[0].length;
            spreadSheetData.forEach(row => row.push({}));
        }

        // Add extra rows if data exceeds the current number of rows
        if (lines.length > spreadSheetData.length) {
            const extraRowsNeeded = lines.length - spreadSheetData.length;
            const extraRows = Array.from({ length: extraRowsNeeded }, () =>
                Array(spreadSheetData[0].length).fill({})
            );
            spreadSheetData = [...spreadSheetData, ...extraRows];
        }

        // Insert data into the selected column
        const newData = spreadSheetData.map((row, rowIndex) => {
            const newRow = [...row];
            newRow[emptyColumnIndex] = { value: lines[rowIndex] || "" };
            return newRow;
        });

        return newData;
    });

    toast({
        description: "Data pushed to spreadsheet!"
    });
  };


  return (
    <>
      <div className="p-0 m-0 flex flex-row justify-between items-center">
        <Label className="mb-2 mt-2 text-lg uppercase tracking-widest">{title}</Label>
        {readOnly && (
          <TooltipProvider>
            <div className="flex flex-row items-center gap-3">
              
              {/* Push to sheet */}
              <TooltipButton message="Push to sheet" variant="ghost" size="icon" onClick={() => pushToSheet()}>
                <RxUpload className='text-xl m-0 p-0'/>
              </TooltipButton>

              {/* Copy to clipboard */}
              <TooltipButton message="Copy to clipboard" variant="ghost" size="icon" onClick={() => copyToClipboard()}>
                <RxClipboardCopy className='text-xl m-0 p-0'/>
              </TooltipButton>
              
              {/* Filters */}
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
          </TooltipProvider>
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
