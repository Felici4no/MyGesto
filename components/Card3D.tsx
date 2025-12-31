'use client';

import React from 'react';
import { CardVariant } from '@/data/presets';
import Countdown from './Countdown';

interface Card3DProps {
    isOpen: boolean;
    to: string;
    from: string;
    msg: string;
    variant?: CardVariant;
    onClose: (e: React.MouseEvent) => void;
}

export default function Card3D({ isOpen, to, from, msg, variant = 'default', onClose }: Card3DProps) {

    // Helper to get gradient/style based on variant
    const getCoverStyle = () => {
        switch (variant) {
            case 'fireworks':
                return 'bg-[#0f0f12] text-white';
            case 'gold':
                return 'bg-[#fffbf0] text-amber-900 border-amber-100';
            case 'sky':
                return 'bg-[#f0f9ff] text-sky-900 border-sky-100';
            case 'nature':
                return 'bg-[#f5fbf7] text-emerald-900 border-emerald-100';
            default:
                return 'bg-[#faf9f6] text-stone-800 border-stone-200';
        }
    };

    const getArtElement = () => {
        if (variant === 'fireworks') {
            return (
                <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                    {/* Dark Night Sky */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#1a103c] to-slate-900"></div>

                    {/* Fireworks - using radiant gradients */}
                    <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(255,100,200,0.8)_0%,transparent_60%)] opacity-60 blur-xl animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(100,200,255,0.6)_0%,transparent_60%)] opacity-50 blur-xl delay-700 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,220,100,0.8)_0%,transparent_60%)] opacity-70 blur-lg delay-300 animate-pulse"></div>

                    {/* Sparkles */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
            )
        }
        if (variant === 'gold') {
            return (
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-50 to-white flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-amber-200/50 shadow-[0_0_30px_rgba(251,191,36,0.2)]"></div>
                </div>
            )
        }
        // Default minimalist art
        return (
            <>
                <div className="absolute inset-0 opacity-[0.4] bg-stone-50/50"></div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-stone-100 to-white shadow-inner flex items-center justify-center border border-stone-50">
                    <div className="w-16 h-16 rounded-full bg-stone-50 shadow-sm"></div>
                </div>
            </>
        )
    }

    const getTitle = () => {
        switch (variant) {
            case 'fireworks': return "Celebre o momento";
            case 'gold': return "Um gesto de valor";
            case 'nature': return "Respire fundo";
            default: return "Um gesto para você";
        }
    }

    return (
        <div className="perspective-1000 w-[320px] h-[460px] relative select-none">
            {/* Container that holds the 'book' */}
            <div className={`relative w-full h-full duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] transition-transform preserve-3d ${isOpen ? 'translate-x-[20px]' : ''}`}>

                {/* INSIDE of the card (The Base) */}
                {/* When closed, this is covered. When open, this is visible. */}
                <div className="absolute inset-0 bg-[#fffdfa] rounded-2xl shadow-xl flex flex-col p-8 items-start text-left border border-stone-100 overflow-hidden">

                    {/* Texture/Noise optional */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 text-stone-300 hover:text-stone-500 transition-opacity p-2 ${isOpen ? 'opacity-100 pointer-events-auto delay-300' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Fechar cartão"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Content */}
                    <div className={`flex flex-col h-full w-full mt-4 transition-opacity duration-700 delay-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-serif text-stone-800 tracking-tight">{to},</h2>
                                <p className="text-stone-500 text-sm mt-1">{from} te dedicou:</p>
                            </div>

                            <div className="relative">
                                {/* Decorative quote line */}
                                <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-stone-100"></div>
                                <p className="text-stone-700 leading-relaxed font-serif text-lg whitespace-pre-wrap">
                                    {msg}
                                </p>
                            </div>

                            <div className="mt-2 border-t border-stone-100 pt-2">
                                <Countdown />
                            </div>
                        </div>

                        <div className="mt-auto pt-8 self-end">
                            <p className="font-serif italic text-stone-600">— {from}</p>
                        </div>
                    </div>

                    {/* Call to Action specific to the 'inside' - Maybe a watermark */}
                    <div className={`absolute bottom-3 left-0 right-0 text-center transition-opacity duration-500 delay-500 scale-90 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="text-[10px] text-stone-300 uppercase tracking-widest font-sans">MyGesto</span>
                    </div>
                </div>


                {/* FRONT COVER (The Flap) */}
                {/* Transform Origin Left: Rotates open like a book cover */}
                <div
                    className={`absolute inset-0 rounded-2xl shadow-sm border transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-left preserve-3d z-10 ${getCoverStyle()} ${isOpen ? '[transform:rotateY(-160deg)] shadow-none' : '[transform:rotateY(0deg)] shadow-2xl'}`}
                >
                    {/* Front Face: The Cover Art */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded-2xl overflow-hidden">
                        {getArtElement()}

                        <div className={`absolute bottom-16 text-center w-full ${variant === 'fireworks' ? 'text-white/60' : 'text-stone-400'}`}>
                            <p className="text-xs tracking-[0.2em] uppercase font-medium">{getTitle()}</p>
                        </div>

                        {/* Click Hint Icon */}
                        <div className={`absolute bottom-6 w-full flex flex-col items-center gap-2 animate-bounce duration-[2000ms] ${variant === 'fireworks' ? 'text-white/50' : 'text-stone-300'}`}>
                            {/* Simple Cursor arrow */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                                <path d="M13 13l6 6" />
                            </svg>
                            <span className="text-[10px] uppercase tracking-widest font-medium opacity-70">
                                Clique para abrir
                            </span>
                        </div>

                        {/* Spine shadow hint on left */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-r from-black/10 to-transparent"></div>
                    </div>

                    {/* Back Face: The Left Inside (Visible when open) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#fffdfa] rounded-2xl border-r border-stone-100">
                        {/* Just a subtle paper texture or blank */}
                        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
                    </div>
                </div>

            </div>

        </div>
    );
}
