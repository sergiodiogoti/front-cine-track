export type Filme = {
    id: string; 
    titulo: string;
    genero: string;
    ano: string; 
    nota: number; 
    critica?: string;
};


const CHAVE = 'ct-filmes-v1';


export const carregarFilmes = (): Filme[] => {
    if (typeof window === 'undefined') return [];
    try {
        const bruto = window.localStorage.getItem(CHAVE);
        return bruto ? JSON.parse(bruto) : [];
    } catch {
        return [];
    }
};


export const salvarFilmes = (lista: Filme[]) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CHAVE, JSON.stringify(lista));
};