'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Download, Share2, Sparkles } from 'lucide-react'

// Simple template styles mapping
const TEMPLATE_STYLES: Record<string, string> = {
    'Essential': 'bg-white text-slate-900 border-slate-200',
    'Afetivo': 'bg-rose-50 text-rose-900 border-rose-100',
    'Elegante': 'bg-stone-50 text-stone-800 border-stone-200 font-serif',
    'Profissional': 'bg-slate-50 text-slate-900 border-slate-200',
    'Discreto': 'bg-zinc-50 text-zinc-800 border-zinc-200',
}

export function CardDisplay({ gift }: { gift: any }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleDownload = () => {
        alert('Implementar download de PDF aqui.')
    }

    const templateClass = TEMPLATE_STYLES[gift.template] || TEMPLATE_STYLES['Essential']

    if (!isOpen) {
        return (
            <div className="text-center space-y-8 cursor-pointer group" onClick={() => setIsOpen(true)}>
                <motion.div
                    layoutId="envelope"
                    className="w-80 h-56 bg-white border border-slate-200 shadow-xl rounded-lg relative overflow-hidden flex items-center justify-center p-8 transition-transform group-hover:-translate-y-2"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50" />
                    <div className="z-10 text-center">
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2 font-display">De {gift.from_name}</p>
                        <div className="h-px w-12 bg-slate-200 mx-auto mb-2" />
                        <p className="text-slate-900 font-semibold">Você recebeu um gesto.</p>
                        <p className="text-xs text-slate-400 mt-4">(Toque para abrir)</p>
                    </div>
                    {/* Visual Envelope Flap Simulation */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[112px] border-t-slate-100/80 border-r-[160px] border-r-transparent pointer-events-none" />
                </motion.div>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full space-y-8 animate-in fade-in duration-700">
            <motion.div
                layoutId="envelope"
                className={cn("p-8 rounded-xl border shadow-lg aspect-[4/5] flex flex-col relative", templateClass)}
            >
                <div className="space-y-1 mb-8">
                    <p className="text-xs font-medium opacity-60 uppercase tracking-widest">De {gift.from_name}</p>
                    <p className="text-sm font-medium opacity-60 uppercase tracking-widest">Para {gift.to_name}</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap text-center font-medium">
                        {gift.message}
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-black/5 flex justify-between items-end">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">{gift.template}</span>
                    {!gift.paid && (
                        <span className="text-[10px] bg-black/5 px-2 py-1 rounded text-black/60 font-medium">
                            Feito com MyGesto
                        </span>
                    )}
                </div>

            </motion.div>

            <div className="space-y-3 px-4">
                {gift.paid ? (
                    <Button variant="primary" block onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" /> Baixar PDF Premium
                    </Button>
                ) : (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-center space-y-3">
                        <p className="text-sm text-yellow-800">
                            Gostou do cartão? Libere a versão completa para baixar em alta qualidade.
                        </p>
                        <Button variant="primary" block size="sm" onClick={() => window.location.href = `/create`}>
                            <Sparkles className="w-3 h-3 mr-2" /> Criar um cartão assim
                        </Button>
                        <button className="text-xs text-slate-400 hover:text-slate-600 underline" onClick={handleDownload}>
                            Baixar versão simples
                        </button>
                    </div>
                )}

                <div className="text-center pt-4">
                    <Link href="/create" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">
                        Enviar um gesto também →
                    </Link>
                </div>
            </div>
        </div>
    )
}
