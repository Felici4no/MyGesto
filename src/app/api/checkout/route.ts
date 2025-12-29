import { NextResponse } from 'next/server'
import { abacate } from '@/lib/abacate'
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

        const session = await abacate.createPayment({
            amount: priceAmount,
            items: [
                {
                    name: productName,
                    description: `Upgrade para o cartão de ${gift.to_name}`,
                    price: priceAmount,
                    quantity: 1
                }
            ],
            customer: {
                name: gift.from_name || 'Cliente',
            },
            metadata: {
                giftId: giftId,
                plan: plan
            }
        })

        // Store session ID in DB (mocked or real)
        await supabase.from('gifts').update({ stripe_session_id: session.id }).eq('id', giftId)

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Checkout error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
