import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // In a real app, fetch data by ID.
    // For MVP, we redirect to demo with query params based on ID if it was a real persistence layer.
    // Or simply mock it.

    // Mock 'special' IDs
    if (id === 'lucas-para-maiara') {
        redirect('/g/demo?to=Maiara&from=Lucas&msg=Feliz%20Ano%20Novo!%20Que%20seja%20lindo.');
    }

    // Default redirect for unknown IDs
    redirect('/g/demo');
}
