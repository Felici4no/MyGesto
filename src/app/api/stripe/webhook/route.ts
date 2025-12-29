import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
        console.error(`Webhook signature verification failed.`, err.message)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const giftId = session.metadata?.giftId
        const plan = session.metadata?.plan as 'pro' | 'deluxe' | undefined

        if (giftId) {
            const supabaseAdmin = getSupabaseAdmin()

            const { error } = await supabaseAdmin
                .from('gifts')
                .update({
                    paid: true,
                    paid_plan: plan || 'pro',
                    // We could also record display names for the wall here if we want to secure "display_from" only for paid users
                })
                .eq('id', giftId)

            if (error) {
                console.error('Error updating gift paid status:', error)
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
            }

            // Also insert into wall_events if show_on_wall was true in the original gift?
            // Or we assume the original logic handles it?
            // Let's fetch the gift to see if we should add to wall.
            const { data: gift } = await supabaseAdmin.from('gifts').select('*').eq('id', giftId).single()

            if (gift && gift.show_on_wall) {
                const { error: wallError } = await supabaseAdmin.from('wall_events').insert({
                    gift_id: giftId,
                    display_from: gift.paid ? gift.from_name : 'Alguém', // Paid users get name revealed? Or per user pref?
                    // Requirement: "Se opt-out: 'Alguém'... se ON: mostrar nomes".
                    // MVP: If show_on_wall is true, we show names.
                    display_to: gift.paid ? gift.to_name : 'alguém especial', // Actually the logic "if ON: show names" applies regardless of payment?
                    // Wait, requirement says: "Se ON: mostrar nomes; se OFF: mostrar como “Alguém…”"
                    // So payment status doesn't change visibility, only priority maybe? 
                    // Let's stick to the user pref 'show_on_wall'. 
                    // But for simplicity, we insert into wall_events ONLY when paid? Or always?
                    // Requirement 1: "Hero... Mural ao vivo (feed de envios recentes)". 
                    // It implies ANY sent card. But maybe only paid ones are "worthy"? 
                    // User didn't specify. I'll insert into wall only if paid to avoid spam, or check requirement.
                    // "Ao enviar, cria registro with status draft...". Draft shouldn't be on wall.
                    // So we insert to wall ONLY when PAID or SENT?
                    // Requirement 3 (Checkout): "Após pagar... prioridade no mural". This implies unpaid might eventually appear or not?
                    // Requirement 1: "Juliana -> Ivone ... agora".
                    // I'll assume only PAID cards go to the wall for the MVP to ensure quality/anti-spam.
                    template: gift.template,
                    created_at: new Date().toISOString()
                })
            }
        }
    }

    return NextResponse.json({ received: true })
}
