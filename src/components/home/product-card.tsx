'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Product } from '@/constants/products'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/create?productId=${product.id}`} className="block relative group">
            <motion.div
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-md transition-shadow",
                    "bg-gradient-to-br",
                    product.visual.gradient
                )}
            >
                {/* Minimalist Content Layer */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">

                    {/* Visual Anchor (Top) - Abstract Decoration */}
                    <div className={cn("w-full h-1/2 opacity-20 bg-white/20 blur-3xl rounded-full absolute -top-10 -right-10")} />

                    {/* Content (Bottom) */}
                    <div className="mt-auto space-y-2 relative z-10">
                        <h3 className={cn(
                            "font-serif text-2xl leading-tight font-medium opacity-90",
                            product.visual.textColor
                        )}>
                            {product.title}
                        </h3>

                        {product.subtitle && (
                            <p className={cn(
                                "text-xs font-medium uppercase tracking-wider opacity-60",
                                product.visual.textColor
                            )}>
                                {product.subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subtle sheen effect on hover (Desktop) */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    )
}
