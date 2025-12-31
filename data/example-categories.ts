import { CardVariant } from "./presets";

export interface ExampleCard {
    id: string;
    variant: CardVariant;
    msg: string;
}

export interface ExampleCategory {
    title: string;
    description?: string;
    cards: ExampleCard[];
}

export const EXAMPLE_CATEGORIES: ExampleCategory[] = [
    {
        title: "Ano Novo",
        cards: [
            {
                id: "ny1",
                variant: "fireworks",
                msg: "Que 2026 seja o palco das suas maiores conquistas. Feliz Ano Novo!"
            },
            {
                id: "ny2",
                variant: "gold",
                msg: "Brilhe muito neste novo ciclo. Muita prosperidade e luz."
            },
            {
                id: "ny3",
                variant: "default",
                msg: "Paz, amor e renovação. Que o ano novo traga tudo isso em dobro."
            },
            {
                id: "ny4",
                variant: "sky",
                msg: "Novos horizontes se abrem. Voe alto em 2026."
            }
        ]
    },
    {
        title: "Para Família",
        cards: [
            {
                id: "fam1",
                variant: "default",
                msg: "Família é onde nossa história começa e o amor nunca termina. Amo vocês."
            },
            {
                id: "fam2",
                variant: "nature",
                msg: "Obrigado por serem minhas raízes e meu porto seguro."
            },
            {
                id: "fam3",
                variant: "gold",
                msg: "Para a melhor mãe/pai do mundo. Sua presença é meu maior presente."
            }
        ]
    },
    {
        title: "Para Amigos",
        cards: [
            {
                id: "fr1",
                variant: "sky",
                msg: "Amizade é a liberdade de ser quem somos. Obrigado por estar comigo."
            },
            {
                id: "fr2",
                variant: "fireworks",
                msg: "Vamos celebrar essa amizade hoje e sempre! Tamo junto."
            },
            {
                id: "fr3",
                variant: "default",
                msg: "Sorte a minha ter um amigo como você."
            }
        ]
    },
    {
        title: "Corporativo",
        cards: [
            {
                id: "corp1",
                variant: "default",
                msg: "Agradecemos a parceria e confiança. Que venham novos sucessos juntos."
            },
            {
                id: "corp2",
                variant: "gold",
                msg: "Excelência é o que nos une. Obrigado por fazer parte da nossa jornada."
            },
            {
                id: "corp3",
                variant: "sky",
                msg: "Planejar o futuro é construir o presente. Contamos com você."
            }
        ]
    }
];
