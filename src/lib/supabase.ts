import { createClient } from '@supabase/supabase-js'
import { MOCK_GIFTS } from './mock-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock Client Implementation
class MockSupabaseClient {
    private mockData: any[] = []

    constructor(data: any[] = []) {
        this.mockData = data
    }

    from(table: string) {
        if (table === 'gifts') {
            return {
                select: (columns: string = '*') => {
                    return {
                        eq: (column: string, value: any) => {
                            if (column === 'id') {
                                return {
                                    single: async () => {
                                        const found = MOCK_GIFTS.find(g => g.id === value) || MOCK_GIFTS[0] // Fallback to first mock if not found for easier testing
                                        return { data: found, error: null }
                                    }
                                }
                            }
                            return { data: [], error: null }
                        }
                    }
                },
                update: (updates: any) => {
                    return {
                        eq: (column: string, value: any) => {
                            console.log(`[MockSupabase] Updated ${table} where ${column}=${value} with`, updates)
                            return { data: [updates], error: null }
                        }
                    }
                },
                insert: (values: any) => {
                    console.log(`[MockSupabase] Inserted into ${table}:`, values)
                    // Return the unpaid mock gift structure, but respecting user inputs could be nice.
                    // However, avoiding complexity, we return the standard Mock ID so flow works.
                    return {
                        select: () => ({
                            single: async () => ({
                                data: { ...MOCK_GIFTS[0], ...values, id: 'mock-uuid-1234' },
                                error: null
                            })
                        })
                    }
                }
            }
        }
        return {
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: 'Table not mocked' }) }) })
        }
    }
}

// Export a real client if envs exist, otherwise a mock
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : new MockSupabaseClient(MOCK_GIFTS) as any

export const getSupabaseAdmin = () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceRoleKey) {
        return createClient(supabaseUrl, serviceRoleKey)
    }
    return new MockSupabaseClient(MOCK_GIFTS) as any
}
