import * as React from "react";
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
  } from "@/components/ui/tooltip"

const TooltipButton = (props) => {
    const {onClick, message, children} = props;

    return (
        <Tooltip>
            <TooltipTrigger>
                <Button variant="ghost" size="icon" onClick={onClick}>
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default TooltipButton;