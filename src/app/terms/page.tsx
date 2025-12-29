export default function TermsPage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
            <div className="prose text-slate-600 space-y-4">
                <p>Bem-vindo ao MyGesto. Ao usar nosso serviço, você concorda com estes termos.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Você é responsável pelo conteúdo dos gestos que cria.</li>
                    <li>Não toleramos conteúdo ofensivo, ilegal ou de ódio.</li>
                    <li>O pagamento libera a formalização do gesto, sem alterar o conteúdo da mensagem.</li>
                    <li>Não há reembolso para gestos já enviados ou visualizados, exceto em casos de erro técnico.</li>
                </ul>
                <p className="text-sm mt-8">Atualizado em: {new Date().toLocaleDateString()}</p>
            </div>
        </main>
    )
}
