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

const Header = () => {

    const [position, setPosition] = React.useState("JSONPath")

    return (
        <div className='flex flex-col p-6'>
            <p className='scroll-m-20 text-3xl font-extrabold tracking-tight first:mt-0 pb-6'>
                Welcome to Jsonpath Evaluator
            </p>
            <div className='flex flex-row'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='mr-6'>
                        <Button variant="ghost">
                            {position}
                            <GoChevronDown className='ml-2'/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select query language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="JSONPath">JSONPath</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="JMESPath">JMESPath</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Input/>
            </div>
        </div>
    )
}

export default Header