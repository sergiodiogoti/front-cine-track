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
    if (editando) {
      setTimeout(() => setForm(editando), 0);
    }
  }, [editando]);

  const aoMudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submeter = (e: React.FormEvent) => {
    e.preventDefault();

    const filmeComId = form.id ? form : { ...form, id: crypto.randomUUID() };

    aoEnviar(filmeComId);
    setForm({
      id: '',
      titulo: '',
      genero: '',
      ano: '',
      nota: 0,
      critica: '',
    });
  };

  return (
    <form onSubmit={submeter}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={aoMudar}
        required
      />
      <input
        type="text"
        name="genero"
        placeholder="Gênero"
        value={form.genero}
        onChange={aoMudar}
        required
      />
      <input
        type="number"
        name="ano"
        placeholder="Ano"
        value={form.ano}
        onChange={aoMudar}
        required
      />
      <input
        type="number"
        name="nota"
        placeholder="Nota (0–10)"
        value={form.nota}
        onChange={aoMudar}
        required
      />
      <textarea
        name="critica"
        placeholder="Escreva uma crítica (opcional)"
        value={form.critica}
        onChange={aoMudar}
      ></textarea>

      <button type="submit">{editando ? 'Atualizar' : 'Adicionar'} Filme</button>
    </form>
  );
}
