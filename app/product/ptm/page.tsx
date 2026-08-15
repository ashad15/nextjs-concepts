"use client"

import { useSelector } from "react-redux"
import { headingStateType } from "../LayoutProvider"

export default function PtmPage(){

    const heading = useSelector((state : headingStateType) => {return state.heading.someHeading})

    return <h1>ptm page {heading}</h1>
}