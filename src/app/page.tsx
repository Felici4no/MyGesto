import { Hero } from '@/components/hero'
import { LiveWall } from '@/components/wall/live-wall'
import { ProductCarousel } from '@/components/home/product-carousel'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-[100dvh] flex flex-col justify-between max-w-lg mx-auto bg-white">
      <header className="p-6 flex justify-center">
        <span className="font-bold text-lg tracking-tight">MyGesto</span>
      </header>

      <Hero />
      <ProductCarousel />
      <LiveWall />

      <footer className="py-8 text-center text-xs text-slate-400 space-x-6 border-t border-slate-50 mx-6">
        <Link href="/terms" className="hover:text-slate-900 transition-colors">Termos</Link>
        <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacidade</Link>
        <Link href="/contact" className="hover:text-slate-900 transition-colors">Contato</Link>
      </footer>
    </main>
  )
}
