"use client"
 
import * as React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import { GoChevronDown } from "react-icons/go";

import {QueryContext} from '../App'
import { LuSettings } from "react-icons/lu";

const Header = () => {
    const {inputText, queryLanguage, setInputText, setQueryLanguage} = React.useContext(QueryContext);
    const jsonPathtextColor = "text-teal-600";
    const jmesPathtextColor = "text-sky-600";

    return (
        <div className='flex flex-col p-6'>
            <div className='flex flex-row justify-between align-items-center w-full'> 
                <p className='scroll-m-20 text-2xl font-extrabold tracking-tight first:mt-0 pb-6'>
                    JSONpath Evaluator
                </p>
                <Button size="icon">
                    <LuSettings className='text-2xl m-0 p-0'/>
                </Button>
            </div>
            
            <div className='flex flex-row'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='mr-6'>
                        <Button variant="secondary" lassName={queryLanguage === 'JSONPath' ? jsonPathtextColor : jmesPathtextColor}>
                            {queryLanguage}
                            <GoChevronDown className='ml-2'/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select query language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={queryLanguage} onValueChange={setQueryLanguage}>
                            <DropdownMenuRadioItem value="JSONPath" className={jsonPathtextColor}>JSONPath</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="JMESPath" className={jmesPathtextColor}>JMESPath</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Input value={inputText} onChange={(e) => setInputText(e.target.value)}/>
            </div>
        </div>
    )
}

export default Header