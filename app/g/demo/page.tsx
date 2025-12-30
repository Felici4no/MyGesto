import GestureCard from "@/components/GestureCard";
import Link from "next/link";
import { Suspense } from "react";

// Wrapper to handle async searchParams in Next.js 15+ properly while keeping the component simple
async function CardView({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    const to = (params.to as string) || "Você";
    const from = (params.from as string) || "Alguém";
    const msg = (params.msg as string) || "Que o próximo ano seja leve e verdadeiro.";

    return (
        <div className="w-full flex flex-col items-center">
            <GestureCard to={to} from={from} msg={msg} />
        </div>
    );
}

export default function DemoPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return (
        <main className="min-h-screen bg-[#fdfdfd] flex flex-col items-center justify-between py-8 px-4 overflow-hidden">

            {/* Header / Brand - minimal */}
            <div className="w-full flex justify-center opacity-30 mt-4">
                <div className="w-3 h-3 rounded-full bg-stone-200"></div>
            </div>

            <Suspense fallback={<div className="text-stone-300 text-sm animate-pulse">Carregando gesto...</div>}>
                <CardView searchParams={searchParams} />
            </Suspense>

            {/* Footer CTA */}
            <div className="mb-4 opacity-0 animate-in fade-in duration-1000 delay-1000 fill-mode-forwards">
                <Link
                    href="/create"
                    className="text-xs font-medium text-stone-400 hover:text-stone-600 transition-colors border-b border-transparent hover:border-stone-300 pb-0.5 uppercase tracking-wider"
                >
                    Criar um gesto como este
                </Link>
            </div>

        </main>
    );
}
