'use client';

import { EXAMPLE_CATEGORIES } from "@/data/example-categories";
import CardRow from "./CardRow";

export default function ExamplesSection() {
    return (
        <div className="flex flex-col gap-8 w-full">
            {EXAMPLE_CATEGORIES.map((category) => (
                <CardRow
                    key={category.title}
                    title={category.title}
                    cards={category.cards}
                />
            ))}
        </div>
    );
}
