export interface AbacateSimpleItem {
    name: string
    description: string
    price: number // in cents
    quantity: number
}

export interface AbacatePaymentData {
    amount: number // in cents
    items: AbacateSimpleItem[]
    customer: {
        name: string
        email?: string
    }
    metadata?: Record<string, string>
}

// Mock implementation of AbacatePay Client
class MockAbacateClient {
    async createPayment(data: AbacatePaymentData) {
        console.log('[MockAbacate] Creating payment:', data)
        return {
            id: 'pay_mock_' + Math.random().toString(36).substring(7),
            // Mock URL redirecting to success
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id=pay_mock_12345&giftId=mock-uuid-paid&mock=true`
        }
    }
}

export const abacate = new MockAbacateClient()
