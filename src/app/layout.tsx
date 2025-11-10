import Link from 'next/link';
import '../estilos/tabela.css';
export const metadata = {
  title: 'CineTrack',
  description: 'CRUD Front + API de Filmes',
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: 16,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <header
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0 }}>CineTrack</h1>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link href="/">Início</Link>
            <a href="/filmes">Filmes</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}