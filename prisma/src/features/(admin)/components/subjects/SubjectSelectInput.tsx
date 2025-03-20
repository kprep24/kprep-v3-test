"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface SubjectSelectInputProps {
    selectedYear: string;
    setSelectedYear: (year: string) => void;

}

function SubjectSelectInput({ selectedYear, setSelectedYear }: SubjectSelectInputProps) {


    const Years = [
        { name: "1st", value: "One" },
        { name: "2nd", value: "Two" },
        { name: "3rd", value: "Three" },
        { name: "4th", value: "Four" }
    ];


    return (
        <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)} >
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Years" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Years.map((year, index) => (
                        <SelectItem key={index} value={year.value}>
                            {year.name}
                        </SelectItem>
                    ))}


                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SubjectSelectInput
