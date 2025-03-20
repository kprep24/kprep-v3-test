import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface WindowSelectProps {
    setWindowSize: (size: number) => void;
    windowSize: number;
}

function WindowSelect({ windowSize, setWindowSize }: WindowSelectProps) {
    return (
        <Select value={windowSize.toString()} onValueChange={(value) => setWindowSize(Number(value))}>
            <SelectTrigger className="w-[90px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default WindowSelect;