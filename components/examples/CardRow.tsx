'use client';

import { ExampleCard } from "@/data/example-categories";
import CardPreview from "./CardPreview";

interface CardRowProps {
    title: string;
    cards: ExampleCard[];
}

export default function CardRow({ title, cards }: CardRowProps) {
    return (
        <div className="flex flex-col gap-4 py-4 w-full">
            <div className="px-6 md:px-12">
                <h2 className="text-sm font-bold text-stone-800 uppercase tracking-widest opacity-80">
                    {title}
                </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="flex overflow-x-auto gap-4 px-6 md:px-12 pb-8 pt-2 scrollbar-none snap-x snap-proximity touch-pan-y min-h-[280px] md:min-h-[340px]"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {cards.map((card) => (
                    <div key={card.id} className="snap-start flex-shrink-0">
                        <CardPreview variant={card.variant} msg={card.msg} />
                    </div>
                ))}

                {/* Padding spacer at end */}
                <div className="w-2 flex-shrink-0"></div>
            </div>
        </div>
    );
}
