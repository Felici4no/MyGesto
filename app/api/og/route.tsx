import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get dynamic values
        const to = searchParams.get('to')?.slice(0, 20) || 'você';
        const from = searchParams.get('from')?.slice(0, 20);

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fafaf9', // stone-50
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Decorative Border/Frame */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '90%',
                            height: '85%',
                            border: '2px solid #e7e5e4', // stone-200
                            borderRadius: '24px',
                            backgroundColor: '#fff',
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)',
                        }}
                    >
                        {/* Valid SVG icon for visual interest */}
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#44403c" // stone-700
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginBottom: 20 }}
                        >
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 52,
                                    fontWeight: 600,
                                    color: '#1c1917', // stone-900
                                    marginBottom: 10,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Um gesto para {to}
                            </div>

                            {from && (
                                <div
                                    style={{
                                        fontSize: 28,
                                        color: '#78716c', // stone-500
                                        fontWeight: 400,
                                    }}
                                >
                                    de {from}
                                </div>
                            )}
                        </div>

                        {/* Footer Brand */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 40,
                                fontSize: 18,
                                color: '#a8a29e', // stone-400
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                        >
                            MyGesto
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
