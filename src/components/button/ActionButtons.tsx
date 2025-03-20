import { Button } from "../ui/button"




interface ButtonProps {
    title?: string;
    onTap: () => void;
    disabled?: boolean;
    color?: string;
}

export const EditButton = ({ title, onTap, disabled, color }: ButtonProps) => {
    return <Button style={{ color }} disabled={disabled || false} onClick={onTap} variant={"link"} className='text-blue-500'>
        {title || "Edit"}
    </Button>
}


export const DeleteButton = ({ title, onTap, disabled }: ButtonProps) => {
    return <Button disabled={disabled || false} onClick={onTap} variant={"link"} className='text-red-500'>
        {title || "Delete"}
    </Button>
}