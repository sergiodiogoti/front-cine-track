'use client';
import { useFilmes } from '@/contexto/FilmesContext';
import FormularioFilme from '@/componentes/FormularioFilme';
import TabelaFilmes from '@/componentes/TabelaFilmes';
import { useState } from 'react';

export default function PaginaFilmes() {
const { listaFiltrada, adicionarOuAtualizar, remover, buscar, mensagem, limparMensagem, editando, editar } = useFilmes();

  const [buscaTexto, setBuscaTexto] = useState('');

  const aoBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value;
    setBuscaTexto(texto);
    buscar(texto);
  };

  return (
    <main style={{ padding: '20px' }}>
      <h2>🎬 Meus Filmes</h2>

      {/* Formulário de cadastro/edição */}
      <FormularioFilme aoEnviar={adicionarOuAtualizar} editando={editando} />

       <div style={{ margin: '12px 0' }}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={buscaTexto}
          onChange={aoBuscar}
        />
      </div>

      {/* Mensagem de feedback */}
      {mensagem && (
        <div
          style={{
            background: 'rgb(77, 167, 77)',
            border: '1px solid #00a000',
            color: '1px solid rgb(182, 207, 182)',
            padding: '8px',
            marginTop: '12px',
            borderRadius: '6px',
          }}
          onAnimationEnd={limparMensagem}
        >
          {mensagem}
        </div>
      )}

      {/* Tabela de filmes */}
      <TabelaFilmes dados={listaFiltrada} aoEditar={editar} aoExcluir={remover} />
    </main>
  );
}
