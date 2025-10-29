import React, { useState } from "react";
import MenuSidebar from "./menuSidebar.jsx";
import { BookStorageHelper } from "./booksFunctions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storageHelper } from "./userFunctions.js";
import "./main.css";

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState("todos");
  const [busca, setBusca] = useState("");
  const livros = BookStorageHelper.getBooks();

  const handleBuscar = () => {};

  const handleSolicitar = (livro) => {
    console.log("Solicitar empréstimo:");
  };
  const navigate = useNavigate();

  useEffect(() => {
    const session = storageHelper.getCurrentUser();
    if (!session) {
      navigate("/login");
    }
  }, []);

  const filteredBooks = BookStorageHelper.getSearchWithFilter(
    busca,
    filtroSelecionado
  );

  return (
    <>
      <MenuSidebar pageAtive={"Início"} />
      <div className="main-container">
        {/* Barra de Busca */}
        <div className="searchBar">
          <input
            type="text"
            placeholder="Pesquise por título, autor ou editora"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {/* Filtro */}
        <div className="styles.filterSection">
          <label className="filterLabel">Filtrar por:</label>
          <select
            value={filtroSelecionado}
            onChange={(e) => setFiltroSelecionado(e.target.value)}
            className="styles.select"
          >
            <option value="todos">Todos os matérias</option>
            <option value="exatas">Ciências Exatas</option>
            <option value="humanas">Ciências Humanas</option>
            <option value="engenharias">Engenharias</option>
            <option value="linguistica">Linguística e Letras</option>
          </select>
        </div>

        {/* Grid de Livros */}
        <div className="livrosGrid">
          {(busca.length > 0 ? filteredBooks : livros).map((livro) => (
            <div key={livro.id} className="styles.livroCard">
              <div className="styles.livroImagem">📚</div>
              <div className="styles.livroTitulo">{livro.titulo}</div>
              <div className="styles.livroSubtitulo">{livro.autor}</div>
              <div className="styles.livroInfo">
                {livro.categoria.join(", ")}
              </div>
              <button
                onClick={() => handleSolicitar(livro)}
                className="styles.botaoSolicitar"
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#0d9488")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#14b8a6")
                }
              >
                Solicitar Empréstimo
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
