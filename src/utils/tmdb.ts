const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

type TMDBItem = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string | null;
};

export async function buscarFilmesTMDB(query: string) {
  if (!query.trim()) return [];

  try {
    const resp = await fetch(
      `${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
    );

    if (!resp.ok) throw new Error('Erro ao buscar filmes.');

    const data = await resp.json();

    if (!data.results) return [];

    // 🔹 Normaliza o formato para o mesmo tipo "Filme"
    return data.results.map((item: TMDBItem) => ({
      id: String(item.id),
      titulo: item.title,
      genero: 'Desconhecido',
      ano: item.release_date ? item.release_date.split('-')[0] : 'N/A',
      nota: Math.round(item.vote_average),
      critica: item.overview || 'Sem descrição disponível.',
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
        : null,
    }));
  } catch (error) {
    console.error('Erro ao buscar na TMDB:', error);
    return [];
  }
}