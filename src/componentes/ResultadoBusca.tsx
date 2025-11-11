'use client';
import type { Filme } from '@/utils/armazenamento';

type Props = {
    resultados: Filme[];
    onAdicionar: (filme: Filme) => void;
};

export default function ResultadoBusca({ resultados, onAdicionar }: Props) {
    if (!resultados || resultados.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666' }}>Nenhum resultado encontrado.</p>;
    }

    const handleAdicionar = (filme: Filme) => {
        onAdicionar(filme);
        alert(`🎬 Filme "${filme.titulo}" adicionado com sucesso!`);
    };

    return (
        <div className="cards-wrap">
            {resultados.map((filme) => (
                <div className="card" key={filme.id}>
                    <div className="poster-wrap">
                        {filme.poster ? (
                            <img src={filme.poster} alt={filme.titulo} className="poster" />
                        ) : (
                            <div className="poster placeholder">Sem imagem</div>
                        )}
                    </div>

                    <div className="card-body">
                        <h4 className="card-title">{filme.titulo}</h4>
                        <p className="card-meta">Ano: <strong>{filme.ano}</strong></p>
                        <button className="btn-add" onClick={() => handleAdicionar(filme)}>
                            ➕ Adicionar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
