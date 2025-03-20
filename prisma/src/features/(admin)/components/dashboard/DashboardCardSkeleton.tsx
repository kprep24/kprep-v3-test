export const DashboardCardSkeleton = () => {
    return (
        <div className="flex items-center gap-2 mt-2 py-2 w-4/12 animate-pulse">
            <div className="left">
                <div className="icon w-[50px] h-[50px] bg-gray-300 rounded-md"></div>
            </div>
            <div className="right">
                <div className="number h-6 w-16 bg-gray-300 rounded"></div>
                <div className="title h-4 w-24 bg-gray-300 rounded mt-1"></div>
            </div>
        </div>
    );
};
