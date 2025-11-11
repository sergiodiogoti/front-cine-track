'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { carregarFilmes, salvarFilmes } from '@/utils/armazenamento';
import type { Filme } from '@/utils/armazenamento';

type FilmesContextType = {
  listaFiltrada: Filme[];
  adicionarOuAtualizar: (filme: Filme) => void;
  remover: (id: string) => void;
  buscar: (texto: string) => void;
  mensagem: string;
  limparMensagem: () => void;
  editando: Filme | null;
  editar: (filme: Filme) => void;
};

const FilmesContext = createContext<FilmesContextType | null>(null);

export function FilmesProvider({ children }: { children: React.ReactNode }) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editando, setEditando] = useState<Filme | null>(null);

  useEffect(() => {
    const dados = carregarFilmes();
    setTimeout(() => setFilmes(dados), 0);
  }, []);

  useEffect(() => {
    salvarFilmes(filmes);
  }, [filmes]);

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const adicionarOuAtualizar = (filme: Filme) => {
    let mensagemAtual = '';
    setFilmes(prev => {
      const existe = prev.some(f => f.id === filme.id);
      const novaLista = existe
        ? prev.map(f => (f.id === filme.id ? filme : f))
        : [...prev, filme];
      mensagemAtual = existe
        ? 'Filme atualizado com sucesso!'
        : 'Filme adicionado com sucesso!';
      return novaLista;
    });
    setMensagem(mensagemAtual);
    setEditando(null);
  };

  const remover = (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover este filme?')) return;
    setFilmes(prev => prev.filter(f => f.id !== id));
    setMensagem('Filme removido com sucesso!');
  };

  const buscar = (texto: string) => setBusca(texto.toLowerCase());

  const editar = (filme: Filme) => setEditando(filme);

  const limparMensagem = () => setMensagem('');

  const listaFiltrada = filmes.filter(f =>
    f.titulo.toLowerCase().includes(busca)
  );

  return (
    <FilmesContext.Provider
      value={{
        listaFiltrada,
        adicionarOuAtualizar,
        remover,
        buscar,
        mensagem,
        limparMensagem,
        editando,
        editar,
      }}
    >
      {children}
    </FilmesContext.Provider>
  );
}

export function useFilmes() {
  const context = useContext(FilmesContext);
  if (!context) {
    throw new Error('useFilmes deve ser usado dentro de um FilmesProvider');
  }
  return context;
}
