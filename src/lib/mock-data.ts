export const MOCK_GIFTS = [
    {
        id: 'mock-uuid-1234',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        from_name: 'Antigravity',
        to_name: 'Usuário',
        message: 'Este é um gesto de exemplo (mock) para testes de deploy. Se você está vendo isso, o banco de dados não está conectado.',
        template: 'Afetivo',
        paid: false,
        payment_id: null,
    },
    {
        id: 'mock-uuid-paid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        from_name: 'Dev Team',
        to_name: 'Tester',
        message: 'Este é um gesto pago de exemplo.',
        template: 'Elegante',
        paid: true,
        payment_id: 'sess_mock_12345',
    }
]
