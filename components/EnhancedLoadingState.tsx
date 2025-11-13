import React, { useState, useEffect } from 'react';
import ResultCardSkeleton from './ResultCardSkeleton';
import AnimatedDog from './AnimatedDog';

const loadingMessages = [
    "AI 正在啟動 Google 搜尋引擎...",
    "正在分析搜尋結果，找出最棒的地點...",
    "為您整理地點清單...",
    "再一下下，美味的咖啡和毛茸茸的朋友就快找到了！"
];

const EnhancedLoadingState: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full text-center py-8">
            <AnimatedDog />
            <p className="mt-4 text-lg text-gray-700 font-semibold h-8">
                {loadingMessages[messageIndex]}
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultCardSkeleton />
                <ResultCardSkeleton />
                <ResultCardSkeleton />
                <ResultCardSkeleton />
            </div>
        </div>
    );
};

export default EnhancedLoadingState;
