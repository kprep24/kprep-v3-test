import React, { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";



interface CardBoxProps {
    title: string;
    description: string;
    children: ReactNode;
    footer?: any
}


function CardBox({ title, description, footer, children }: CardBoxProps) {
    return (
        <Card className="w-[350px] bg-slate-800 border-0">
            <CardHeader>
                <CardTitle className="text-xl text-white">
                    {title}
                </CardTitle>
                <CardDescription className="text-slate-300">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className='text-center flex justify-center'>
                {footer}
            </CardFooter>
        </Card>
    )
}

export default CardBox
