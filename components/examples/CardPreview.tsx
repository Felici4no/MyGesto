'use client';

import Link from "next/link";
import { CardVariant } from "@/data/presets";
import { useEffect, useState } from "react";

interface CardPreviewProps {
    variant: CardVariant;
    msg: string;
}

export default function CardPreview({ variant, msg }: CardPreviewProps) {
    // We recreate a simplified version of the card look using CSS for performance
    // instead of rendering the full heavyweight 3D component 20 times.

    const getVariantStyles = () => {
        switch (variant) {
            case 'fireworks':
                return 'bg-[#0f0f12] text-white/80 border-stone-800';
            case 'gold':
                return 'bg-[#fffbf0] text-amber-900 border-amber-100';
            case 'sky':
                return 'bg-[#f0f9ff] text-sky-900 border-sky-100';
            case 'nature':
                return 'bg-[#f5fbf7] text-emerald-900 border-emerald-100';
            default:
                return 'bg-[#faf9f6] text-stone-600 border-stone-200';
        }
    };

    const getArt = () => {
        if (variant === 'fireworks') {
            return <div className="w-8 h-8 rounded-full bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse"></div>;
        }
        if (variant === 'gold') {
            return <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/30"></div>;
        }
        return <div className="w-8 h-8 rounded-full bg-stone-900/5"></div>;
    }

    return (
        <Link
            href={`/create?variant=${variant}&msg=${encodeURIComponent(msg)}`}
            className="block group relative flex-shrink-0 w-[180px] h-[260px] md:w-[220px] md:h-[320px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-stone-400"
        >
            <div className={`absolute inset-0 border shadow-sm flex flex-col items-center justify-center p-6 ${getVariantStyles()}`}>
                {/* Decorative top */}
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-current opacity-10 to-transparent"></div>

                {/* Art Circle */}
                <div className="mb-6 scale-150 opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {getArt()}
                </div>

                {/* Text Preview */}
                <div className="text-center w-full overflow-hidden relative" style={{ height: '60%' }}>
                    {/* Fade at bottom */}
                    <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${variant === 'fireworks' ? 'from-[#0f0f12]' :
                        variant === 'gold' ? 'from-[#fffbf0]' :
                            variant === 'sky' ? 'from-[#f0f9ff]' :
                                variant === 'nature' ? 'from-[#f5fbf7]' :
                                    'from-[#faf9f6]'
                        }`}></div>

                    <p className="text-[10px] md:text-xs font-serif opacity-80 leading-relaxed italic px-2">
                        "{msg}"
                    </p>
                </div>

                {/* Action Hint */}
                <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                        Usar este
                    </span>
                </div>
            </div>
        </Link>
    );
}
