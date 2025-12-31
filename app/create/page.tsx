import CreateForm from "@/components/CreateForm"; // Verify alias or relative path
import Link from "next/link";

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-stone-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-md flex justify-between items-center mb-10">
                <Link href="/" className="text-stone-400 hover:text-stone-600 transition-colors text-sm font-medium flex items-center gap-2">
                    ← Voltar
                </Link>
                <span className="text-xs font-bold text-stone-300 uppercase tracking-widest">Editor</span>
            </div>

            <div className="flex flex-col items-center gap-2 mb-8 text-center">
                <h1 className="text-2xl font-serif text-stone-800">Novo Gesto</h1>
                <p className="text-stone-500 text-sm">Crie algo único em poucos segundos.</p>
            </div>

            <CreateForm />
        </main>
    );
}
