import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-stone-100 text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center border border-stone-50 shadow-sm mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h1 className="text-3xl font-serif text-stone-900 tracking-tight">MyGesto</h1>
          <p className="text-stone-500 text-sm max-w-[280px] leading-relaxed">
            Um cartão digital com alma física.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col w-full gap-3">
          <Link
            href="/create"
            className="w-full py-4 rounded-xl bg-stone-900 text-white text-sm font-medium tracking-wide uppercase hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
          >
            Criar um gesto
          </Link>

          <Link
            href="/examples"
            className="w-full py-4 rounded-xl bg-white text-stone-600 border border-stone-200 text-sm font-medium tracking-wide uppercase hover:bg-stone-50 transition-colors"
          >
            Ver exemplos
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 opacity-40">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">MVP v1.0 • Next.js</p>
        </div>
      </div>
    </main>
  );
}
