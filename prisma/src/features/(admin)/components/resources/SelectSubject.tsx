import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IcourseList } from "../course_branch/branch/AddBranch"

interface ISelectSubject {
    list: IcourseList[]
    disable: boolean;
    setSubject: (subject: string) => void;
}


export function SelectSubject({ list, disable, setSubject }: ISelectSubject) {
    console.log(list)
    return (
        <Select disabled={disable} onValueChange={(value) => setSubject(value)}>
            <SelectTrigger className="w-[210px]">
                <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {list && list.map((item) => <SelectItem key={item.value} value={item.value}>
                        {item.title}
                    </SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
