export type CardVariant = 'default' | 'fireworks' | 'sky' | 'gold' | 'nature';

export interface Preset {
    id: string;
    variant: CardVariant;
    label: string;
    msg: string;
    colorClass: string; // Helper for UI selector
}

export const PRESETS: Preset[] = [
    {
        id: 'p1',
        variant: 'fireworks',
        label: 'Ano Novo',
        msg: 'Que as luzes do novo ano tragam clareza para os seus sonhos e coragem para realizá-los. Feliz 2026!',
        colorClass: 'bg-stone-900 text-purple-200'
    },
    {
        id: 'p2',
        variant: 'gold',
        label: 'Sucesso',
        msg: 'Brilho, abundância e novos caminhos. Que sua jornada seja tão valiosa quanto você merece.',
        colorClass: 'bg-amber-100 text-amber-800'
    },
    {
        id: 'p3',
        variant: 'sky',
        label: 'Inspiração',
        msg: 'Olhe para o horizonte infinito. O mundo é vasto e há um lugar especial esperando por você.',
        colorClass: 'bg-sky-100 text-sky-800'
    },
    {
        id: 'p4',
        variant: 'nature',
        label: 'Paz',
        msg: 'Respire fundo. Que a calma e a renovação floresçam em seus dias como a natureza na primavera.',
        colorClass: 'bg-emerald-50 text-emerald-800'
    },
    {
        id: 'p5',
        variant: 'default',
        label: 'Clássico',
        msg: 'Um gesto simples para lembrar que você é importante. Conte comigo sempre.',
        colorClass: 'bg-stone-100 text-stone-600'
    }
];
