"use client"
 
import * as React from "react"
import { Button } from "@/components/ui/button"
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { RiArrowRightWideLine, RiSettingsLine } from "react-icons/ri";
import Spreadsheet from "react-spreadsheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TbColumnInsertLeft, TbRowInsertTop } from "react-icons/tb";
import ExportData from "./ExportData";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"

import {
    Drawer,
    DrawerContent
} from "@/components/ui/drawer"

const SpreadSheet = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [spreadSheetData, setSpreadSheetData] = React.useState(() => generateSpreadsheetGrid(30, 20));

    function generateSpreadsheetGrid(numRows, numColumns) {
        const data = [];
        for (let i = 0; i < numRows; i++) {
          const row = [];
          for (let j = 0; j < numColumns; j++) {
            row.push({});
          }
          data.push(row);
        }
        return data;
    }

    function addColumn() {
        const newColumn = {};
        const newData = spreadSheetData.map(row => {
          return [...row, newColumn];
        });

        setSpreadSheetData(newData);
    }

    function addRow() {
        const newRow = Array(spreadSheetData[0].length).fill({});
        const newData = [...spreadSheetData, newRow];
      
        setSpreadSheetData(newData);
    }

    return (
        <>
            <div className="h-full">
                <Button className="fixed left-0 top-1/3 bottom-0 h-1/3 w-4 flex items-center justify-center bg-zinc-800" size="icon" onClick={() => setDrawerOpen(true)}>
                    <RiArrowRightWideLine className='m-0 p-0'/>
                </Button>
            </div>
            <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen} preventCycle={true} handleOnly={true}>
                <DrawerContent className="h-full w-90 pl-6 pr-6">
                    {/* Menu Bar */}
                    <div className="flex flex-row justify-between align-items-center w-full mb-6">
                        {/* <p className="fixed flex justify-self-center text-zinc-300 text-3xl decoration-1">SHEET</p> */}
                        <Menubar>
                            {/* Export functionality */}
                            <ExportData data={spreadSheetData} />
                            {/* Spreadsheet action */}
                            <MenubarMenu>
                                <MenubarTrigger>Actions<RiSettingsLine className='ml-3 text-lg'/></MenubarTrigger>
                                <MenubarSeparator />
                                <MenubarContent>
                                    <MenubarItem onClick={addColumn}><TbColumnInsertLeft className='mr-3 text-lg'/>Add column</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={addRow}><TbRowInsertTop className='mr-3 text-lg'/>Add row</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                        <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                            <TfiArrowCircleLeft className='text-3xl m-0 p-0'/>
                        </Button>
                    </div>
                    {/* Spreadsheet Area */}
                    <ScrollArea orientation="horizontal" className="h-5/6 w-full rounded-lg border p-4">
                        <Spreadsheet data={spreadSheetData} onChange={setSpreadSheetData} />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SpreadSheet