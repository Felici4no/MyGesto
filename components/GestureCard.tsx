'use client';

import { useState } from 'react';
import Card3D from './Card3D';

interface GestureCardProps {
    to: string;
    from: string;
    msg: string;
}

export default function GestureCard({ to, from, msg }: GestureCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        // If open, close it. If closed, open it.
        // User requirement: "Depois de aberto, permitir fechar tocando no canto superior (um pequeno “×” discreto) OU tocando fora do cartão."
        // For simplicity here, toggling works on the container if we handle clicks carefully.
        // However, clicking *inside* the message shouldn't close it necessarily, unless it's a specific 'close' action.
        // But the prompt says "tocando fora do cartão" implies a backdrop.
        // The "card" itself is the clickable entity to open.
        setIsOpen(!isOpen);
    };

    const handleOpen = () => {
        if (!isOpen) setIsOpen(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-4 relative">
            {/* Backdrop for closing when open? Optional, maybe just click outside handling in page or simple toggle */}

            <div
                role="button"
                tabIndex={0}
                onClick={handleOpen}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
                className={`relative transition-all duration-500 outline-none ${isOpen ? 'cursor-default' : 'cursor-pointer'}`}
                aria-label={isOpen ? "Cartão aberto" : "Toque para abrir o cartão"}
            >
                <Card3D
                    isOpen={isOpen}
                    to={to}
                    from={from}
                    msg={msg}
                    onClose={handleClose}
                />
            </div>

            {!isOpen && (
                <p className="mt-8 text-sm text-gray-400 font-medium animate-pulse tracking-wide uppercase text-[10px]">
                    Toque para abrir
                </p>
            )}
        </div>
    );
}
