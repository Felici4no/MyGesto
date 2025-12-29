'use client'

import { PRODUCTS } from '@/constants/products'
import { ProductCard } from './product-card'

export function ProductCarousel() {
    return (
        <section className="py-8 space-y-4">
            <div className="px-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Escolha um cartão
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="w-full overflow-x-auto pb-4 pt-2 -mt-2 hide-scrollbar">
                <div className="flex px-6 space-x-4 min-w-max">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {/* Spacer for right padding on mobile */}
                    <div className="w-2" />
                </div>
            </div>
        </section>
    )
}
