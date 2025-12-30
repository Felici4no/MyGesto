import GestureCard from "@/components/GestureCard";
import Link from "next/link";
import { Suspense } from "react";

// Wrapper to handle async searchParams in Next.js 15+ properly while keeping the component simple
async function CardView({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    const to = (params.to as string) || "Você";
    const from = (params.from as string) || "Alguém";
    const msg = (params.msg as string) || "Que o próximo ano seja leve e verdadeiro.";
    const variant = (params.variant as any) || "default";

    return (
        <div className="w-full flex flex-col items-center">
            <GestureCard to={to} from={from} msg={msg} variant={variant} />
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
            <div className="mb-8 w-full px-6 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-forwards flex flex-col items-center">
                <Link
                    href="/create"
                    className="w-full max-w-xs py-4 rounded-xl bg-stone-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 text-center"
                >
                    Criar um gesto como este
                </Link>
                <p className="text-[10px] text-stone-400 mt-3 uppercase tracking-widest">
                    MyGesto • Gratuito
                </p>
            </div>

        </main>
    );
}
