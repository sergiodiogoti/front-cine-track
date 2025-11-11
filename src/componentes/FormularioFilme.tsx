'use client';
import { useState, useEffect } from 'react';
import type { Filme } from '@/utils/armazenamento';

type Props = {
  aoEnviar: (filme: Filme) => void;
  editando?: Filme | null;
};

export default function FormularioFilme({ aoEnviar, editando }: Props) {
  const [form, setForm] = useState<Filme>({
    id: '',
    titulo: '',
    genero: '',
    ano: '',
    nota: 0,
    critica: '',
  });

  useEffect(() => {
    if (editando) setTimeout(() => setForm(editando), 0);
  }, [editando]);

  const aoMudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submeter = (e: React.FormEvent) => {
    e.preventDefault();
    const filmeComId = form.id ? form : { ...form, id: crypto.randomUUID() };
    aoEnviar(filmeComId);
    setForm({ id: '', titulo: '', genero: '', ano: '', nota: 0, critica: '' });
  };

  return (
    <div className="form-filme">
      <h3>Adicionar Novo Filme</h3>

      <form onSubmit={submeter}>
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Digite o título do filme"
            value={form.titulo}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="genero">Gênero</label>
          <input
            type="text"
            id="genero"
            name="genero"
            placeholder="Ex: Ação, Drama..."
            value={form.genero}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="ano">Ano</label>
          <input
            id="ano"
            name="ano"
            type="number"
            placeholder="Ex: 2024"
            value={form.ano || ''}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="nota">Nota (0–10)</label>
          <input
            id="nota"
            name="nota"
            type="number"
            min="0"
            max="10"
            value={form.nota || ''}
            onChange={aoMudar}
            required
          />
        </div>

        <div className="campo campo--full">
          <label htmlFor="critica">Crítica (opcional)</label>
          <textarea
            id="critica"
            name="critica"
            placeholder="Escreva sua opinião sobre o filme..."
            value={form.critica || ''}
            onChange={aoMudar}
          />
        </div>

        <div className="linha-botao">
          <button type="submit">
            {editando ? 'Atualizar Filme' : 'Adicionar Filme'}
          </button>
        </div>
      </form>
    </div>
  );
}
