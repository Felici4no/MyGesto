'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const TEMPLATES = [
    { id: 'Essential', label: 'Essencial', color: 'bg-white border-slate-200' },
    { id: 'Afetivo', label: 'Afetivo', color: 'bg-rose-50 border-rose-100' },
    { id: 'Elegante', label: 'Elegante', color: 'bg-stone-50 border-stone-200' },
    { id: 'Profissional', label: 'Profissional', color: 'bg-slate-50 border-slate-200' },
    { id: 'Discreto', label: 'Discreto', color: 'bg-zinc-50 border-zinc-200' },
]

export function CreateForm() {
    const router = useRouter()
    const [step, setStep] = useState<'create' | 'review'>('create')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        fromName: '',
        toName: '',
        template: 'Essential',
        message: '',
        showOnWall: true
    })

    // Review state data (gift ID created)
    const [createdGiftId, setCreatedGiftId] = useState<string | null>(null)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // Create draft gift
            const { data, error } = await supabase
                .from('gifts')
                .insert({
                    from_name: formData.fromName,
                    to_name: formData.toName,
                    template: formData.template,
                    message: formData.message,
                    show_on_wall: formData.showOnWall,
                    access_token: crypto.randomUUID(), // Simple token generation
                    paid: false
                })
                .select()
                .single()

            if (error) throw error

            setCreatedGiftId(data.id)
            setStep('review')
        } catch (error) {
            console.error('Error creating gift:', error)
            toast.error('Erro ao criar o gesto.')
        } finally {
            setLoading(false)
        }
    }

    const handlePayment = async (plan: 'pro' | 'deluxe') => {
        if (!createdGiftId) return
        // Redirect to checkout with giftId and plan
        router.push(`/checkout?giftId=${createdGiftId}&plan=${plan}`)
    }

    const handleFreeSend = () => {
        if (!createdGiftId) return
        // Just share the link
        const link = `${window.location.origin}/g/${createdGiftId}`
        if (navigator.share) {
            navigator.share({
                title: `Um gesto para ${formData.toName}`,
                text: 'Te enviei um cartão.',
                url: link
            })
        } else {
            navigator.clipboard.writeText(link)
            toast.success('Link copiado para a área de transferência!')
        }
    }

    if (step === 'review') {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Seu gesto está pronto.</h2>
                    <p className="text-slate-500">Revise antes de enviar.</p>
                </div>

                {/* Preview Card */}
                <div className={cn(
                    "p-8 rounded-xl border shadow-sm aspect-[4/5] flex flex-col justify-center items-center text-center space-y-6 mx-auto max-w-sm",
                    TEMPLATES.find(t => t.id === formData.template)?.color
                )}>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">De {formData.fromName}</p>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Para {formData.toName}</p>
                    </div>
                    <p className="text-lg font-serif italic text-slate-800 whitespace-pre-wrap">{formData.message}</p>
                    <p className="text-[10px] text-slate-300 mt-auto pt-8">Feito com MyGesto</p>
                </div>

                <div className="space-y-3">
                    <Button variant="primary" block size="lg" onClick={() => handlePayment('pro')}>
                        Formalizar gesto · R$ 5
                    </Button>
                    <p className="text-xs text-center text-slate-400">Remove a marca e libera o download.</p>

                    <Button variant="outline" block onClick={handleFreeSend}>
                        Enviar como está
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">De quem?</label>
                    <input
                        type="text"
                        value={formData.fromName}
                        onChange={e => setFormData({ ...formData, fromName: e.target.value })}
                        placeholder="Seu nome"
                        className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Para quem?</label>
                    <input
                        type="text"
                        value={formData.toName}
                        onChange={e => setFormData({ ...formData, toName: e.target.value })}
                        placeholder="Nome da pessoa"
                        className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                    />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Escolha o estilo</label>
                <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setFormData({ ...formData, template: t.id })}
                            className={cn(
                                "p-3 rounded-lg border text-sm font-medium transition-all",
                                formData.template === t.id
                                    ? "ring-2 ring-slate-900 border-transparent bg-slate-50"
                                    : "border-slate-100 hover:border-slate-300 text-slate-500"
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-slate-700">Sua mensagem</label>
                <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    maxLength={240}
                    rows={4}
                    placeholder="Escreva sua mensagem"
                    className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300 resize-none"
                />
                <div className="text-right text-xs text-slate-400 mt-1">
                    {formData.message.length}/240
                </div>
            </div>

            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl">
                <input
                    type="checkbox"
                    id="showOnWall"
                    checked={formData.showOnWall}
                    onChange={e => setFormData({ ...formData, showOnWall: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div className="flex flex-col">
                    <label htmlFor="showOnWall" className="text-sm text-slate-600">
                        Mostrar este gesto no mural
                    </label>
                    <span className="text-[10px] text-slate-400">Exibimos apenas nomes e o momento. Nunca o texto.</span>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={loading || !formData.fromName || !formData.toName || !formData.message}
                block
                size="lg"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Criar gesto"}
            </Button>
        </div>
    )
}
