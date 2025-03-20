'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecurityLayer({ children }: { children: React.ReactNode }) {
    console.log("THis is disbale page")
    const router = useRouter();

    useEffect(() => {
        // Disable Right-Click Context Menu
        const handleContextMenu = (event: MouseEvent) => event.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        // Detect DevTools
        const devToolsDetect = () => {
            console.log('%c ', 'font-size: 50px');
            console.clear();
            setTimeout(() => {
                if (
                    window.outerHeight - window.innerHeight > 100 || 
                    window.outerWidth - window.innerWidth > 100
                ) {
                    router.push('/userboard'); // Redirect to Home Page
                }
            }, 100);
        };

        window.addEventListener('resize', devToolsDetect);

        // Clean up event listeners
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('resize', devToolsDetect);
        };
    }, [router]);

    return <>{children}</>;
}
