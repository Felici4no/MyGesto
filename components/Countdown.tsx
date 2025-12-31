'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Target: Jan 1, 2026
        const targetDate = new Date('2026-01-01T00:00:00').getTime();

        const updateTime = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                // clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }

        updateTime(); // Run immediately
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex gap-3 text-center justify-center py-4 animate-in fade-in duration-700">
            <div className="flex flex-col">
                <span className="text-xl font-mono font-bold text-stone-800">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-widest text-stone-400">Dias</span>
            </div>
            <span className="text-xl font-mono text-stone-300">:</span>
            <div className="flex flex-col">
                <span className="text-xl font-mono font-bold text-stone-800">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-widest text-stone-400">Hrs</span>
            </div>
            <span className="text-xl font-mono text-stone-300">:</span>
            <div className="flex flex-col">
                <span className="text-xl font-mono font-bold text-stone-800">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-widest text-stone-400">Min</span>
            </div>
            <span className="text-xl font-mono text-stone-300">:</span>
            <div className="flex flex-col">
                <span className="text-xl font-mono font-bold text-stone-800">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-widest text-stone-400">Seg</span>
            </div>
        </div>
    );
}
