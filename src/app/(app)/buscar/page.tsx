'use client';
import { useState } from 'react';
import { buscarFilmesTMDB } from '@/utils/tmdb';
import type { Filme } from '@/utils/armazenamento';
import ResultadoBusca from '@/componentes/ResultadoBusca';
import { useFilmes } from '@/contexto/FilmesContext';

export default function PaginaBusca() {
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const { adicionarOuAtualizar } = useFilmes();

  const aoBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    setResultados([]);

    try {
      const filmes = await buscarFilmesTMDB(termo);
      setResultados(filmes);
    } catch (err) {
      setErro('Erro ao buscar filmes');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="pagina-busca">
      <h2>🎥 Buscar Filmes (via TMDb)</h2>

      <form onSubmit={aoBuscar} className="form-busca">
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={termo}
          onChange={e => setTermo(e.target.value)}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}
      <ResultadoBusca resultados={resultados} onAdicionar={adicionarOuAtualizar} />
    </div>
  );
}
