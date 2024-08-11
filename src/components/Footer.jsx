"use client"

import * as React from "react"

const Footer = () => {

    return (
        <div className='flex flex-row fixed justify-center items-center bottom-0 w-screen bg-white text-cyan-900 text-md decoration-1 p-1 gap-1'>
            <a href="https://github.com/udz-codes/jsonpath-evaluator" target="_blank">
                <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/udz-codes/jsonpath-evaluator"></img>
            </a>
            <a href="https://github.com/udz-codes" target="_blank">
                <img src="https://img.shields.io/github/followers/udz-codes?style=social" alt="GitHub followers" />
            </a>
        </div>
    )
}

export default Footer