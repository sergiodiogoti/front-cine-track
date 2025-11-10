import { useState } from 'react';
import type { Filme } from '@/utils/armazenamento';


export function useFormulario(filmeInicial: Filme | null, aoSalvar: (filme: Filme) => void) {
  const [form, setForm] = useState<Filme>(
    filmeInicial ?? {
      id: crypto.randomUUID(),
      titulo: '',
      genero: '',
      ano: '',
      nota: 0,
      critica: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    aoSalvar(form);
    setForm({
      id: crypto.randomUUID(),
      titulo: '',
      genero: '',
      ano: '',
      nota: 0,
      critica: '',
    });
  };

  const preencherFormulario = (filme: Filme) => setForm(filme);

  return { form, handleChange, handleSubmit, preencherFormulario };
}
