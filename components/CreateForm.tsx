'use client';

import { useState, useEffect } from 'react';
import CopyLinkButton from './CopyLinkButton';
import SuggestionSelector from './SuggestionSelector';
import { Preset, CardVariant } from '@/data/presets';

export default function CreateForm() {
    const [formData, setFormData] = useState({
        to: '',
        from: '',
        msg: '',
        variant: 'default' as CardVariant
    });

    const [generatedLink, setGeneratedLink] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Pre-fill form from URL params (when coming from examples page)
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const urlVariant = params.get('variant') as CardVariant;
            const urlMsg = params.get('msg');

            if (urlVariant || urlMsg) {
                setFormData(prev => ({
                    ...prev,
                    ...(urlVariant && { variant: urlVariant }),
                    ...(urlMsg && { msg: urlMsg })
                }));
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePresetSelect = (preset: Preset) => {
        setFormData(prev => ({
            ...prev,
            variant: preset.variant,
            msg: preset.msg
        }));
    };

    const isFormValid = formData.to.trim() && formData.from.trim() && formData.msg.trim().length >= 5 && formData.msg.trim().length <= 120;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Build URL query params
        const params = new URLSearchParams({
            to: formData.to.trim(),
            from: formData.from.trim(),
            msg: formData.msg.trim(),
            variant: formData.variant
        });

        // In production, this would be the domain. Localhost for now.
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/g/demo?${params.toString()}`;

        setGeneratedLink(link);
    };

    if (!isClient) return null;

    return (
        <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            {!generatedLink ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="to" className="text-xs font-medium text-stone-500 uppercase tracking-wider">Para quem?</label>
                        <input
                            id="to"
                            name="to"
                            type="text"
                            placeholder="Ex: Maiara"
                            value={formData.to}
                            onChange={handleChange}
                            className="px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-stone-200 outline-none text-stone-800 placeholder-stone-400 transition-all font-sans"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="from" className="text-xs font-medium text-stone-500 uppercase tracking-wider">De quem?</label>
                        <input
                            id="from"
                            name="from"
                            type="text"
                            placeholder="Ex: Lucas"
                            value={formData.from}
                            onChange={handleChange}
                            className="px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-stone-200 outline-none text-stone-800 placeholder-stone-400 transition-all font-sans"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <label htmlFor="msg" className="text-xs font-medium text-stone-500 uppercase tracking-wider">Mensagem</label>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${formData.msg.length > 120 ? 'text-red-400' : 'text-stone-300'}`}>
                                {formData.msg.length}/120
                            </span>
                        </div>
                        <textarea
                            id="msg"
                            name="msg"
                            placeholder="Escreva algo breve e sincero..."
                            value={formData.msg}
                            onChange={handleChange}
                            maxLength={120}
                            rows={3}
                            className="px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-stone-200 outline-none text-stone-800 placeholder-stone-400 transition-all resize-none font-serif leading-relaxed"
                            required
                        />
                    </div>

                    {/* Theme/Preset Selector */}
                    <SuggestionSelector
                        onSelect={handlePresetSelect}
                        selectedVariant={formData.variant}
                    />

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`
              mt-2 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all
              ${isFormValid
                                ? 'bg-stone-900 text-white shadow-lg shadow-stone-200 hover:shadow-xl hover:-translate-y-0.5'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
            `}
                    >
                        Gerar Gesto
                    </button>
                </form>
            ) : (
                <div className="flex flex-col gap-6 items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>

                    <div>
                        <h3 className="text-stone-800 font-serif text-xl">Pronto.</h3>
                        <p className="text-stone-500 text-sm mt-2">Seu gesto foi criado. Copie o link abaixo e envie.</p>
                    </div>

                    <div className="w-full bg-stone-50 p-3 rounded-lg border border-stone-100 overflow-hidden">
                        <p className="text-xs text-stone-400 font-mono truncate select-all">{generatedLink}</p>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        {/* WhatsApp Share Button */}
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Olá! Criei um gesto especial para você: ${generatedLink}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl bg-[#25D366] text-white text-sm font-semibold tracking-wide uppercase hover:bg-[#20BA5A] transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Compartilhar no WhatsApp
                        </a>

                        <CopyLinkButton url={generatedLink} />

                        <button
                            onClick={() => setGeneratedLink('')}
                            className="text-xs text-stone-400 hover:text-stone-600 underline decoration-stone-200 underline-offset-4"
                        >
                            Criar outro
                        </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-100 w-full">
                        <a
                            href={generatedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-stone-800 tracking-wider uppercase flex items-center justify-center gap-1 hover:opacity-70"
                        >
                            Testar link agora
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
