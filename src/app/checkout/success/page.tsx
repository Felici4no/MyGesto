'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function CheckoutSuccessContent() {
    const searchParams = useSearchParams()
    const giftId = searchParams.get('giftId')
    const router = useRouter()
    const [status, setStatus] = useState<'pending' | 'confirmed'>('pending')
    const [polling, setPolling] = useState(true)

    useEffect(() => {
        if (!giftId) return

        // Poll for payment confirmation
        const interval = setInterval(async () => {
            const { data } = await supabase.from('gifts').select('paid').eq('id', giftId).single()
            if (data?.paid) {
                setStatus('confirmed')
                setPolling(false)
                clearInterval(interval)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [giftId])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-6 max-w-sm mx-auto">
            {status === 'pending' ? (
                <>
                    <Loader2 className="animate-spin w-10 h-10 text-slate-400" />
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-slate-900">Pagamento em processamento...</h1>
                        <p className="text-sm text-slate-500">Estamos aguardando a confirmação do banco. Isso deve levar poucos segundos.</p>
                    </div>
                </>
            ) : (
                <div className="space-y-6 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900">Tudo pronto!</h1>
                        <p className="text-slate-500">Seu gesto premium foi liberado.</p>
                    </div>
                    <button
                        onClick={() => router.push(`/g/${giftId}`)}
                        className="w-full bg-slate-900 text-white rounded-xl py-3 font-medium shadow-lg shadow-slate-200"
                    >
                        Ver meu gesto
                    </button>
                </div>
            )}
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-6 max-w-sm mx-auto">
                <Loader2 className="animate-spin w-10 h-10 text-slate-400" />
            </div>
        }>
            <CheckoutSuccessContent />
        </Suspense>
    )
}
