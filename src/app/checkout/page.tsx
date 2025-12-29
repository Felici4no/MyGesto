'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function CheckoutContent() {
    const searchParams = useSearchParams()
    const giftId = searchParams.get('giftId')
    const plan = searchParams.get('plan')
    const router = useRouter()
    const [error, setError] = useState('')

    useEffect(() => {
        if (!giftId || !plan) {
            setError('Pedido inválido.')
            return
        }

        const startCheckout = async () => {
            try {
                const res = await fetch('/api/checkout', {
                    method: 'POST',
                    body: JSON.stringify({ giftId, plan }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json()
                if (data.url) {
                    window.location.href = data.url
                } else {
                    setError('Erro ao iniciar pagamento.')
                }
            } catch (err) {
                setError('Erro de conexão.')
                console.error(err)
            }
        }

        startCheckout()
    }, [giftId, plan])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-2">Ops. Algo deu errado.</h1>
                    <p className="text-slate-500 mb-4">{error}</p>
                    <button onClick={() => router.push('/create')} className="text-sm font-medium underline">Voltar</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-4">
            <Loader2 className="animate-spin w-8 h-8 text-slate-900" />
            <p className="text-slate-500 font-medium animate-pulse">
                Preparando pagamento...
            </p>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-4">
                <Loader2 className="animate-spin w-8 h-8 text-slate-900" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    )
}
