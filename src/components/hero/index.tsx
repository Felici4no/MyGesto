import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
            <div className="mb-8 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-slate-100 to-white rounded-full blur-2xl opacity-50 pointer-events-none" />
                <h1 className="relative text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                    Um gesto.<br />
                    <span className="text-slate-400">Sem esforço.</span>
                </h1>
            </div>

            <p className="max-w-xs text-lg text-slate-500 mb-10 leading-relaxed">
                Uma forma simples e elegante de dizer algo importante.
            </p>

            <div className="w-full max-w-xs space-y-4">
                <Link href="/create" className="block w-full">
                    <Button size="lg" block className="rounded-full shadow-lg shadow-slate-200">
                        Criar um gesto
                    </Button>
                </Link>
                <p className="text-xs text-slate-400">
                    Funciona direto no WhatsApp · Mobile-first
                </p>
            </div>
        </section>
    )
}
