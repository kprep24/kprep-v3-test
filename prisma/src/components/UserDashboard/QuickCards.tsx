import Link from 'next/link';

interface QuickCardsProps {
    title: string
    subtitle: string
    icon: React.ReactNode
    link: string
}

export function QuickCards({ title, subtitle, icon, link }: QuickCardsProps) {
    return (
        <div>
            <Link href={link}>
                <div className="quick-card rounded-lg dark:hidden block p-5 border-[1px] border-gray-800 shadow-lg transition-all hover:shadow-lg" style={{ background: 'linear-gradient(180deg, rgba(255, 246, 180, 0.91) 0%, #74AA63 89.67%)', height: '200px' }}>
                    <div className="flex flex-col items-start justify-between h-full">
                        <div>
                            <h3 className="font-semibold text-black text-xl mb-2">{title}</h3>
                            <p className="text-gray-700">{subtitle}</p>
                        </div>
                        <div className="icon mt-6 text-9xl text-black self-end">
                            {icon}
                        </div>
                    </div>
                </div>
            </Link>
            <Link href={link}>
                <div className="quick-card rounded-lg dark:block hidden p-5 shadow-md transition-all hover:shadow-lg" style={{ background: 'linear-gradient(180deg, #333333 0%, #446377 100%)', height: '200px' }}>
                    <div className="flex flex-col items-start justify-between h-full">
                        <div>
                            <h3 className="font-semibold dark:text-white text-xl mb-2">{title}</h3>
                            <p className="dark:text-gray-300">{subtitle}</p>
                        </div>
                        <div className="icon mt-6 dark:text-white text-9xl text-black self-end">
                            {icon}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}


