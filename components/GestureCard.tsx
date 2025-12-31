'use client';

import { useState } from 'react';
import Card3D from './Card3D';
import { CardVariant } from '@/data/presets';

interface GestureCardProps {
    to: string;
    from: string;
    msg: string;
    variant?: CardVariant;
}

export default function GestureCard({ to, from, msg, variant = 'default' }: GestureCardProps) {
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
                className={`relative transition-all duration-500 outline-none z-30 ${isOpen ? 'cursor-default' : 'cursor-pointer'}`}
                aria-label={isOpen ? "Cartão aberto" : "Toque para abrir o cartão"}
            >
                <Card3D
                    isOpen={isOpen}
                    to={to}
                    from={from}
                    msg={msg}
                    variant={variant}
                    onClose={handleClose}
                />
            </div>

            {!isOpen && (
                <div className="absolute bottom-20 text-center animate-pulse z-20">
                    <p className="text-sm text-stone-400 font-medium tracking-wide uppercase text-[10px]">
                        Toque para abrir
                    </p>
                </div>
            )}

            {/* Floating Footer CTA - Fixed position relative to container or screen */}
            <div className={`fixed bottom-8 left-0 right-0 px-6 flex flex-col items-center transition-all duration-1000 z-40 ${isOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <a
                    href="/create"
                    className="w-full max-w-xs py-4 rounded-xl bg-stone-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 text-center"
                >
                    Criar um gesto como este
                </a>
                <p className="text-[10px] text-stone-400 mt-3 uppercase tracking-widest">
                    MyGesto • Gratuito
                </p>
            </div>
            );
}
