"use client"
 
import * as React from "react"
import { Button } from "@/components/ui/button"
import { GoXCircle } from "react-icons/go";
import { RiArrowRightWideLine } from "react-icons/ri";
import Spreadsheet from "react-spreadsheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TbColumnInsertLeft, TbRowInsertTop } from "react-icons/tb";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import {
    Drawer,
    DrawerContent
} from "@/components/ui/drawer"

const SpreadSheet = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [spreadSheetData, setSpreadSheetData] = React.useState([
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
    ]);

    // React.useEffect(() => {
    //     console.log(spreadSheetData);
    // }, [spreadSheetData])

    function addColumn() {
        // Create a new empty object to represent the new column
        const newColumn = {};
      
        // Update the spreadSheetData using the spread operator (...)
        const newData = spreadSheetData.map(row => {
          // Add the new empty object (new column) to each row
          return [...row, newColumn];
        });
      
        // Update the state with the modified data
        setSpreadSheetData(newData);
      }

      function addRow() {
        // Create a new row with empty objects
        const newRow = Array(spreadSheetData[0].length).fill({});
      
        // Update the spreadSheetData using the spread operator (...)
        const newData = [...spreadSheetData, newRow];
      
        // Update the state with the modified data
        setSpreadSheetData(newData);
      }

    return (
        <>
            <div className="h-full">
                <Button className="fixed left-0 top-1/3 bottom-0 h-1/3 w-4 flex items-center justify-center bg-zinc-800" size="icon" onClick={() => setDrawerOpen(true)}>
                    <RiArrowRightWideLine className='m-0 p-0'/>
                </Button>
            </div>
            <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="h-full w-90 pl-6 pr-6">
                    <div className="grid justify-between items-center w-full mb-6">
                        <p className="fixed flex justify-self-center text-zinc-300 text-3xl decoration-1">SHEET</p>
                        <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                            <GoXCircle className='text-3xl m-0 p-0'/>
                        </Button>
                    </div>
                    <ScrollArea orientation="horizontal" className="h-5/6 w-full rounded-lg border p-4">
                        <Spreadsheet data={spreadSheetData} onChange={setSpreadSheetData} />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="flex flex-row justify-center items-center mt-3 w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="ghost" size="icon" onClick={() => addColumn()}>
                                        <TbColumnInsertLeft className='text-3xl m-0 p-0'/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Add Column</p>
                                </TooltipContent>
                            </Tooltip>
                            
                            <Button variant="ghost" size="icon" onClick={() => addRow()}>
                                <TbRowInsertTop className='text-3xl m-0 p-0'/>
                            </Button>
                        </TooltipProvider>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SpreadSheet