export default function ContactPage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6">Contato</h1>
            <p className="text-slate-600 mb-4">
                Tem alguma dúvida ou problema com seu cartão?
            </p>
            <a href="mailto:suporte@mygesto.app" className="text-blue-600 underline text-lg">
                suporte@mygesto.app
            </a>
            <p className="mt-8 text-sm text-slate-500">
                Respondemos em até 24 horas úteis.
            </p>
        </main>
    )
}
