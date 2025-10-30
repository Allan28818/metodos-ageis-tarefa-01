import { useEffect } from "react";
import { useState } from "react";
import { BookStorageHelper } from "./booksFunctions";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./LivroDetalhes.css";
import MenuSidebar from "./menuSidebar";

export default function BookDetail() {
  const { id } = useParams();
  const [livro, setLivro] = useState({});
  const navigate = useNavigate();
  const [recomendacoes, setRecomendacoes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const livroEncontrado = BookStorageHelper.getOneBook(+id);

    if (!livroEncontrado) {
      navigate(-1);
    } else {
      setLivro(livroEncontrado);
      const livrosRemendacoes = BookStorageHelper.getBooks();
      setRecomendacoes(livrosRemendacoes);
    }
  }, [id, navigate]);

  return (
    <>
      <MenuSidebar />
      <div className="livro-detalhes-container">
        {/* Botão Voltar */}
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <div className="livro-detalhes-content">
          {/* Seção Principal */}

          {/* Coluna Esquerda - Informações */}
          <div className="livro-info">
            <h1 className="livro-titulo">{livro.titulo}</h1>
            <p className="livro-autor">{livro.autor}</p>
            <div className="livroInfo">
              {livro.categoria?.map((categoria, index) => (
                <span className="tag" key={index}>
                  {categoria}
                </span>
              ))}
            </div>
            <p>{livro.descrição}</p>

            <p className="livro-descricao">{livro.descricao}</p>

            <button className="btn-solicitar">Solicitar Empréstimo</button>
          </div>

          {/* Coluna Direita - Capa */}
          <div className="livro-capa-wrapper">
            <div className="livro-capa">
              <div className="capa-icon">{livro.capa}</div>
            </div>
            <div className="livro-posted">
              <div className="posted-avatar">👤</div>
              <span>Postado por {livro.postBy}</span>
            </div>
          </div>
        </div>
        {/* Seção de Recomendações */}
        <div className="livrosGrid">
          {recomendacoes.map((livro) => (
            <div key={livro.id} className="livroCard">
              <div className="livroImagem"></div>
              <div className="details">
                <div className="livroTitulo">{livro.titulo}</div>
                <div className="livroSubtitulo">{livro.autor}</div>
                <div className="livroInfo">
                  {livro.categoria.map((categoria, index) => (
                    <span key={index}>{categoria}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleSolicitar(livro)}
                  className="botaoSolicitar"
                >
                  Solicitar Empréstimo
                </button>
                <div className="link">
                  <button onClick={() => navigate(`/bookDetail/${livro.id}`)}>
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
