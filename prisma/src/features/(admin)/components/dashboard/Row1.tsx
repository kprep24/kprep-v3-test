import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboardCardItemRow1 } from '@/constants/dashboardCardItems'
import React from 'react'
import { useDashboardCards } from '../../hooks/useDashboardCards';

function Row1() {


    const { cards } = useDashboardCards();





    return (






        <Card className='mt-2'>
            <CardHeader>
                <CardTitle>
                    Administrations & Notes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='wrapper flex flex-wrap'>
                    {
                        cards.map((item, i) => {
                            return (
                                <div key={i} className='flex items-center gap-2 mt-2  py-2 w-4/12'>
                                    <div className="left">
                                        <div className="icon w-[50px] h-[50px] bg-main flex justify-center items-center rounded-md text-2xl">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="number text-xl">
                                            {item.number}
                                        </div>
                                        <div className="title">
                                            {item.title}
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </CardContent>
        </Card>

    )
}

export default Row1
