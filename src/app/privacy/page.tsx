export default function PrivacyPage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
            <div className="prose text-slate-600 space-y-4">
                <p>Sua privacidade é importante para o MyGesto.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Nós coletamos apenas os dados necessários para criar e entregar o gesto (nomes, mensagem).</li>
                    <li>Dados de pagamento são processados por plataforma segura de terceiros.</li>
                    <li>Não vendemos seus dados para terceiros.</li>
                    <li>Os gestos são públicos se você compartilhar o link, mas indexação é evitada via robots.txt.</li>
                </ul>
                <p className="text-sm mt-8">Contato: privacy@mygesto.app</p>
            </div>
        </main>
    )
}
