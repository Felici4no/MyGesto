import Stripe from 'stripe'

class MockStripeClient {
    checkout = {
        sessions: {
            create: async (params: any) => {
                console.log('[MockStripe] Created session with params:', params)
                return {
                    id: 'sess_mock_' + Math.random().toString(36).substring(7),
                    // Force redirect to the PAID mock gift ID so success page shows confirmation
                    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id=sess_mock_12345&giftId=mock-uuid-paid&mock=true`
                }
            }
        }
    }
}

export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover', // Use latest or compatible version
        typescript: true,
    })
    : new MockStripeClient() as any
