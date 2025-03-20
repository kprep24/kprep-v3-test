
import React from "react"
import { Button } from "../ui/button";


interface SubmitButtonProps {
    title: string,
    width?: string,
    style?: {
        [key: string]: string
    },
    disabled?: boolean  // Optional prop to disable the button

}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, disabled, width, style }: SubmitButtonProps) => {

    return (
        <Button style={style} disabled={disabled} className={`${width ? width : 'w-full'}  dark:bg-white dark:text-black`} type="submit">

            {disabled ? <div className="flex items-center justify-center">
                <svg
                    className="animate-spin h-5 w-5 mr-3 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Loading...</span>
            </div> : title}

        </Button>
    )

}

export default SubmitButton;