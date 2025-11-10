'use client';
import { useEffect, useState } from 'react';

type Filme = {
  id: string;
  titulo: string;
  genero: string;
  ano: string;
  nota: number;
  critica: string;
};

type Props = {
  dados: Filme[];
  aoEditar: (filme: Filme) => void;
  aoExcluir: (id: string) => void;
};

export default function TabelaFilmes({ dados, aoEditar, aoExcluir }: Props) {
  const [isClient, setIsClient] = useState(false);

  // Aguarda o React hidratar o cliente antes de renderizar
  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null; // Evita renderização dupla
  }

  return (
    <table className="tabela-filmes">
      <thead>
        <tr>
          <th>Título</th>
          <th>Gênero</th>
          <th>Ano</th>
          <th>Nota</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.length === 0 ? (
          <tr>
            <td colSpan={5} className="nenhum">
              Nenhum filme cadastrado ainda.
            </td>
          </tr>
        ) : (
          dados.map((filme) => (
            <tr key={filme.id}>
              <td>{filme.titulo}</td>
              <td>{filme.genero}</td>
              <td>{filme.ano}</td>
              <td>{filme.nota}</td>
              <td className="acoes">
                <button className="editar" onClick={() => aoEditar(filme)}>
                  Editar
                </button>
                <button className="excluir" onClick={() => aoExcluir(filme.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
