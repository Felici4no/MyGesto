import GestureCard from "@/components/GestureCard";
import Link from "next/link";
import { Suspense } from "react";

import { Metadata } from "next";

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

export async function generateMetadata({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
    const params = await searchParams;
    const to = (params.to as string) || "você";
    const from = (params.from as string) || "alguém";

    const ogUrl = new URL("https://mygesto.vercel.app/api/og");
    ogUrl.searchParams.set("to", to);
    if (from !== "alguém") {
        ogUrl.searchParams.set("from", from);
    }

    return {
        title: `Um gesto para ${to}`,
        description: `${from} te enviou um cartão no MyGesto`,
        openGraph: {
            title: `Um gesto para ${to}`,
            description: `${from} te enviou um cartão no MyGesto`,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: `Cartão para ${to}`,
                },
            ],
        },
    };
}

export default function DemoPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return (
        <main className="min-h-screen bg-[#fdfdfd] flex flex-col items-center justify-center relative overflow-hidden">

            {/* Header / Brand - absolute top */}
            <div className="absolute top-8 w-full flex justify-center opacity-30 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-stone-200"></div>
            </div>

            <Suspense fallback={<div className="text-stone-300 text-sm animate-pulse">Carregando gesto...</div>}>
                <CardView searchParams={searchParams} />
            </Suspense>



        </main>
    );
}
