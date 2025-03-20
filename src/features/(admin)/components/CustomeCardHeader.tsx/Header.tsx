"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useOpenSheet } from '../../hooks/useOpenSheet'
import { CardHeader } from '@/components/ui/card';


interface CustomHeaderProps {
    title: string;
    onClick: () => void;
    buttonTitle: string;
    secondButton?: string;
    secondBtnClick?: () => void;
}

export default function CustomHeader({ title, onClick, buttonTitle, secondButton, secondBtnClick }: CustomHeaderProps) {

  

    return (
        <CardHeader>
            <div className='flex justify-between'>
                <div className="title">
                    <h1 className='text-2xl font-semibold'>
                        {title}
                    </h1>
                </div>
                <div className="action flex gap-2">
                    {
                        secondButton &&
                        <Button onClick={secondBtnClick}>
                            {secondButton}
                        </Button>
                    }
                    <Button onClick={onClick}>
                        {buttonTitle}
                    </Button>
                </div>
            </div>
        </CardHeader>
    )
}
