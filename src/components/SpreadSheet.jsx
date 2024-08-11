"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { RiArrowRightWideLine, RiSettingsLine } from "react-icons/ri";
import Spreadsheet from "react-spreadsheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TbColumnInsertLeft, TbColumnInsertRight, TbRowInsertTop, TbRowInsertBottom } from "react-icons/tb";
import ExportData from "./ExportData";
import { SpreadsheetContext } from "./SpreadsheetContext"
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
    const { spreadSheetData, setSpreadSheetData } = React.useContext(SpreadsheetContext);

    // Add column to the end
    function addColumnToEnd() {
        const newColumn = {};
        const newData = spreadSheetData.map(row => {
            return [...row, newColumn];
        });

        setSpreadSheetData(newData);
    }

    // Add row to the end
    function addRowToEnd() {
        const newRow = Array(spreadSheetData[0].length).fill({});
        const newData = [...spreadSheetData, newRow];

        setSpreadSheetData(newData);
    }

    // Add column to the start
    function addColumnToStart() {
        const newColumn = {};
        const newData = spreadSheetData.map(row => {
            return [newColumn, ...row];
        });

        setSpreadSheetData(newData);
    }

    // Add row to the start
    function addRowToStart() {
        const newRow = Array(spreadSheetData[0].length).fill({});
        const newData = [newRow, ...spreadSheetData];

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
                        <Menubar>
                            
                            {/* Export functionality */}
                            <ExportData data={spreadSheetData} />
                            
                            {/* Spreadsheet action */}
                            <MenubarMenu>
                                <MenubarTrigger>Actions<RiSettingsLine className='ml-3 text-lg'/></MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={addRowToStart}><TbRowInsertBottom className='mr-3 text-lg'/>Add top row</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={addRowToEnd}><TbRowInsertTop className='mr-3 text-lg'/>Add bottom row</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={addColumnToStart}><TbColumnInsertRight className='mr-3 text-lg'/>Add start column</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={addColumnToEnd}><TbColumnInsertLeft className='mr-3 text-lg'/>Add end column</MenubarItem>
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

export default SpreadSheet;