'use client';
import { useEffect, useMemo, useState } from 'react';
import FormularioFilme from '@/componentes/FormularioFilme';
import TabelaFilmes from '@/componentes/TabelaFilmes';
import { carregarFilmes, salvarFilmes } from '@/utils/armazenamento';
import type { Filme } from '@/utils/armazenamento';

export default function PaginaFilmes() {
  const [lista, setLista] = useState<Filme[]>(() => carregarFilmes());
  const [editando, setEditando] = useState<Filme | null>(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    salvarFilmes(lista);
  }, [lista]);

  const adicionarOuAtualizar = (filme: Filme) => {
    setLista(prev => {
      const existe = prev.some(x => x.id === filme.id);
      return existe
        ? prev.map(x => (x.id === filme.id ? { ...x, ...filme } : x))
        : [...prev, filme];
    });
    setEditando(null);
  };

  const remover = (id: string) => {
    if (!confirm(`Tem certeza que deseja excluir este filme?`)) return;
    setLista(prev => prev.filter(x => x.id !== id));
  };

  const filtrada = useMemo(
    () => lista.filter(x => x.titulo.toLowerCase().includes(busca.toLowerCase())),
    [lista, busca]
  );

  return (
    <main>
      <h2>Minha Lista de Filmes</h2>

      <div style={{ margin: '12px 0' }}>
        <input
          placeholder="Buscar por título"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <FormularioFilme aoEnviar={adicionarOuAtualizar} editando={editando} />

      <hr style={{ margin: '16px 0' }} />

      <TabelaFilmes dados={filtrada} aoEditar={setEditando} aoExcluir={remover} />

      <p style={{ marginTop: 16 }}>
        
      </p>
    </main>
  );
}
