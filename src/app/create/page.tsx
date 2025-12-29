import { CreateForm } from '@/components/create/create-form'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-white max-w-lg mx-auto flex flex-col">
            <header className="p-6 flex items-center">
                <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <span className="font-bold text-lg tracking-tight ml-2">Novo Gesto</span>
            </header>

            <div className="flex-1 px-6 pb-12">
                <CreateForm />
            </div>
        </main>
    )
}
