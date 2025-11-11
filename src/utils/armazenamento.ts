/*Tipagem principal do filme*/
export type Filme = {
  id: string;
  titulo: string;
  genero: string;
  ano: string;
  nota: number;
  critica?: string;
};

/*Chave usada no localStorage*/
const CHAVE = '@cineTrack:filmes-v1';

/*Carrega a lista de filmes do localStorage*/
export const carregarFilmes = (): Filme[] => {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    const lista = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(lista)
      ? lista.filter(f =>
          f.id && f.titulo && f.genero && f.ano && typeof f.nota === 'number'
        )
      : [];
  } catch (erro) {
    console.error('Erro ao carregar filmes do localStorage:', erro);
    return [];
  }
};



/*Salva a lista de filmes no localStorage*/
export const salvarFilmes = (lista: Filme[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAVE, JSON.stringify(lista));
};
