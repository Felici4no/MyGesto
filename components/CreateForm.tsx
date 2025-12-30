'use client';

import { useState, useEffect } from 'react';
import CopyLinkButton from './CopyLinkButton';

export default function CreateForm() {
    const [formData, setFormData] = useState({
        to: '',
        from: '',
        msg: ''
    });

    const [generatedLink, setGeneratedLink] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.to.trim() && formData.from.trim() && formData.msg.trim().length >= 5 && formData.msg.trim().length <= 120;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Build URL query params
        const params = new URLSearchParams({
            to: formData.to.trim(),
            from: formData.from.trim(),
            msg: formData.msg.trim()
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
