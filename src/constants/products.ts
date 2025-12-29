export interface Product {
    id: string
    title: string
    subtitle?: string
    theme: 'afeto' | 'celebracao' | 'silencio' | 'dinheiro' | 'saude' | 'familia'
    templateId: 'Essential' | 'Afetivo' | 'Elegante' | 'Profissional' | 'Discreto'
    initialMessage: string
    visual: {
        gradient: string
        icon?: string // Could be an emoji or lucide icon name if we were dynamic, but for now just styling
        textColor: string
    }
}

export const PRODUCTS: Product[] = [
    {
        id: 'special-someone',
        title: 'Para alguém especial',
        subtitle: 'Um gesto para alguém importante',
        theme: 'afeto',
        templateId: 'Afetivo',
        initialMessage: 'Queria te dizer o quanto você é importante pra mim.',
        visual: {
            gradient: 'from-rose-100 to-rose-200',
            textColor: 'text-rose-900',
        }
    },
    {
        id: 'celebrate',
        title: 'Para comemorar',
        subtitle: 'Um momento que merece ser marcado',
        theme: 'celebracao',
        templateId: 'Essential',
        initialMessage: 'Queria celebrar esse momento com você.',
        visual: {
            gradient: 'from-sky-100 to-blue-200',
            textColor: 'text-sky-900',
        }
    },
    {
        id: 'deep-words',
        title: 'Quando as palavras pesam',
        subtitle: 'Para dizer algo sério',
        theme: 'silencio',
        templateId: 'Elegante',
        initialMessage: 'Algumas coisas precisam ser ditas com cuidado.',
        visual: {
            gradient: 'from-stone-800 to-stone-900',
            textColor: 'text-stone-100',
        }
    },
    {
        id: 'prosperity',
        title: 'Para desejar prosperidade',
        subtitle: 'Um desejo para o próximo ciclo',
        theme: 'dinheiro',
        templateId: 'Profissional',
        initialMessage: 'Que este novo ciclo traga crescimento e tranquilidade.',
        visual: {
            gradient: 'from-emerald-800 to-emerald-900',
            textColor: 'text-emerald-50',
        }
    },
    {
        id: 'care',
        title: 'Para cuidar de alguém',
        subtitle: 'Apoio em um momento delicado',
        theme: 'saude',
        templateId: 'Discreto',
        initialMessage: 'Estou torcendo por você e pela sua recuperação.',
        visual: {
            gradient: 'from-teal-50 to-teal-100',
            textColor: 'text-teal-900',
        }
    },
    {
        id: 'family',
        title: 'Para quem sempre esteve lá',
        subtitle: 'Um agradecimento sincero',
        theme: 'familia',
        templateId: 'Afetivo',
        initialMessage: 'Queria te agradecer por tudo o que você sempre fez por mim.',
        visual: {
            gradient: 'from-amber-50 to-orange-100',
            textColor: 'text-amber-900',
        }
    }
]
