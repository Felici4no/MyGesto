'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Mock types for now
type WallEvent = {
    id: string
    display_from: string
    display_to: string
    template: string
    created_at: string
}

// Mock data
const MOCK_EVENTS = [
    { id: '1', display_from: 'Juliana', display_to: 'Ivone', template: 'Afetivo', created_at: 'agora' },
    { id: '2', display_from: 'Carlos', display_to: 'Ana', template: 'Elegante', created_at: '2 min' },
    { id: '3', display_from: 'Alguém', display_to: 'alguém especial', template: 'Discreto', created_at: '5 min' },
]

export function LiveWall() {
    const [events, setEvents] = useState<WallEvent[]>([])

    useEffect(() => {
        // Simulate fetching
        setEvents(MOCK_EVENTS)
    }, [])

    return (
        <section className="py-12 px-6 border-t border-slate-100">
            <div className="max-w-md mx-auto">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
                    Mural ao vivo
                </h3>

                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                            <div className="flex flex-col">
                                <span className="font-medium text-slate-900">
                                    {event.display_from} <span className="text-slate-300">→</span> {event.display_to}
                                </span>
                                <span className="text-xs text-slate-500">Cartão {event.template}</span>
                            </div>
                            <span className="text-xs text-slate-400 font-medium tabular-nums">
                                {event.created_at}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
