'use client';
import '@/estilos/filme.css';

import { FilmesProvider } from '@/contexto/FilmesContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <FilmesProvider>
          <nav style={{
            background: '#007bff',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <a href="/filmes" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>🎬 Meus Filmes</a>
            <a href="/buscar" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>🔍 Buscar na OMDb</a>
          </nav>

          {children}
        </FilmesProvider>
      </body>
    </html>
  );
}
