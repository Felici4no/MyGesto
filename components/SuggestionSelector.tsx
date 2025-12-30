'use client';

import { PRESETS, Preset } from '@/data/presets';

interface SuggestionSelectorProps {
    onSelect: (preset: Preset) => void;
    selectedVariant?: string;
}

export default function SuggestionSelector({ onSelect, selectedVariant }: SuggestionSelectorProps) {

    return (
        <div className="flex flex-col gap-2 mt-4">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Sugestões e Temas</span>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar items-start">
                {PRESETS.map((preset) => (
                    <button
                        key={preset.id}
                        type="button"
                        onClick={() => onSelect(preset)}
                        className={`
                  flex-shrink-0 w-32 flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all
                  ${selectedVariant === preset.variant
                                ? 'border-stone-800 bg-stone-50 ring-1 ring-stone-800'
                                : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
                            }
               `}
                    >
                        <div className={`w-full h-16 rounded-lg ${preset.colorClass} flex items-center justify-center text-[10px] font-bold tracking-widest uppercase mb-1`}>
                            {preset.label}
                        </div>
                        <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed font-serif">
                            {preset.msg}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
