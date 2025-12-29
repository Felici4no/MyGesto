import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const giftId = searchParams.get('giftId')

    if (!giftId) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 40,
                        color: 'black',
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    MyGesto
                </div>
            ),
            { width: 1200, height: 630 }
        )
    }

    // Fetch gift
    const { data: gift } = await supabase.from('gifts').select('*').eq('id', giftId).single()

    if (!gift) {
        return new ImageResponse(<div>Not Found</div>, { width: 1200, height: 630 })
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                    fontFamily: 'sans-serif', // Ideally load a font
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div style={{ fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8' }}>
                        MyGesto
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '40px' }}>
                        <span style={{ fontSize: 60, fontWeight: 'bold', color: '#0f172a' }}>{gift.from_name}</span>
                        <span style={{ fontSize: 40, color: '#cbd5e1' }}>→</span>
                        <span style={{ fontSize: 60, fontWeight: 'bold', color: '#0f172a' }}>{gift.to_name}</span>
                    </div>

                    <div style={{ marginTop: 'auto', fontSize: 20, color: '#64748b' }}>
                        Cartão {gift.template}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
