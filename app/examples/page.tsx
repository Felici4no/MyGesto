import Link from "next/link";
import ExamplesSection from "@/components/examples/ExamplesSection";

export const metadata = {
    title: "MyGesto - Exemplos de Cartões",
    description: "Inspire-se com nossa coleção de gestos para todas as ocasiões.",
};

export default function ExamplesPage() {
    return (
        <main className="min-h-screen bg-stone-100 flex flex-col py-12 pb-32">
            {/* Header */}
            <div className="w-full px-6 md:px-12 flex justify-between items-center mb-10">
                <Link href="/" className="text-stone-400 hover:text-stone-600 transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar
                </Link>
                <Link href="/" className="text-xs font-bold text-stone-300 uppercase tracking-widest hover:text-stone-400 transition-colors">
                    MyGesto
                </Link>
            </div>

            {/* Hero / Title */}
            <div className="px-6 md:px-12 mb-12">
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3 tracking-tight">
                    Inspire-se
                </h1>
                <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                    Navegue por nossa coleção de gestos. Escolha um estilo para começar a editar.
                </p>
            </div>

            {/* Categories Section */}
            <ExamplesSection />

        </main>
    );
}
