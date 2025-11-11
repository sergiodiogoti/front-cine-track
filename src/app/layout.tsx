'use client';
import '@/estilos/filme.css';

import { FilmesProvider } from '@/contexto/FilmesContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <FilmesProvider>
            {children}
        </FilmesProvider>
      </body>
    </html>
  );
}
