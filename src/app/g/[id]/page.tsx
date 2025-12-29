import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { CardDisplay } from '@/components/view/card-display'
import { Metadata } from 'next'

// Fetch gift data
async function getGift(id: string) {
    const { data } = await supabase.from('gifts').select('*').eq('id', id).single()
    return data
}

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params
    const gift = await getGift(id)

    if (!gift) return {}

    const ogUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?giftId=${id}`
        : `http://localhost:3000/api/og?giftId=${id}`

    return {
        title: `Um gesto para ${gift.to_name}`,
        description: `${gift.from_name} te enviou um cartão.`,
        openGraph: {
            title: `Um gesto para ${gift.to_name}`,
            description: `${gift.from_name} te enviou um cartão.`,
            images: [
                {
                    url: ogUrl,
                    width: 1200,
                    height: 630,
                }
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
        }
    }
}

export default async function GiftPage({ params }: Props) {
    const { id } = await params
    const gift = await getGift(id)

    if (!gift) notFound()

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <CardDisplay gift={gift} />
        </main>
    )
}
