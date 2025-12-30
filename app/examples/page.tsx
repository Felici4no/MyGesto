import Link from "next/link";
import GestureCard from "@/components/GestureCard";
import { PRESETS } from "@/data/presets";

export default function ExamplesPage() {
    return (
        <main className="min-h-screen bg-[#fdfdfd] flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-md flex justify-between items-center mb-10">
                <Link href="/" className="text-stone-400 hover:text-stone-600 transition-colors text-sm font-medium flex items-center gap-2">
                    ← Voltar
                </Link>
                <span className="text-xs font-bold text-stone-300 uppercase tracking-widest">Coleção</span>
            </div>

            <div className="flex flex-col items-center gap-2 mb-12 text-center">
                <h1 className="text-2xl font-serif text-stone-800">Inspire-se</h1>
                <p className="text-stone-500 text-sm">Escolha um estilo para ver em detalhes.</p>
            </div>

            <div className="w-full max-w-md flex flex-col gap-16 pb-20">
                {PRESETS.map((preset) => (
                    <div key={preset.id} className="flex flex-col items-center gap-2">
                        <div className="w-full flex justify-center scale-[0.85] origin-top mb-[-60px]">
                            {/* Mock data for visualization */}
                            <GestureCard
                                to="Você"
                                from="MyGesto"
                                msg={preset.msg}
                                variant={preset.variant}
                            />
                        </div>

                        <div className="z-20 flex flex-col items-center gap-3 mt-4">
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{preset.label}</p>
                            <Link
                                href={`/create?variant=${preset.variant}&msg=${encodeURIComponent(preset.msg)}`}
                                className="px-6 py-3 bg-white border border-stone-200 shadow-sm rounded-full text-xs font-bold tracking-wide text-stone-700 hover:bg-stone-50 hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                Usar este modelo
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
