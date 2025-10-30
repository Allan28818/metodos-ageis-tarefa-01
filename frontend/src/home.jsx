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
  const [filteredBooks, setFilteredBooks] = useState([]);
  const categorias = BookStorageHelper.getCategorias();

  const handleBuscar = () => {
    setFilteredBooks(
      BookStorageHelper.getSearchWithFilter(busca, filtroSelecionado)
    );
  };

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

  return (
    <>
      <MenuSidebar pageAtive={"Início"} />
      <div className="main-container">
        {/* Barra de Busca */}
        <input
          className="searchInput"
          type="text"
          placeholder="Buscar por título, autor ou palavra-chave..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {/* Filtro */}
        <div className="searchBar">
          <div className="filterSection">
            <label className="filterLabel">Filtrar por:</label>
            <select
              value={filtroSelecionado}
              onChange={(e) => setFiltroSelecionado(e.target.value)}
              className="select"
            >
              <option key={0} value="todos">
                Todos os matérias
              </option>
              {categorias.map((categoria, index) => (
                <option key={index + 1} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleBuscar} className="searchButton">
            Buscar
          </button>
        </div>

        {/* Grid de Livros */}
        <div className="livrosGrid">
          {(busca.length > 0 || filtroSelecionado !== "todos"
            ? filteredBooks
            : livros
          ).map((livro) => (
            <div key={livro.id} className="livroCard">
              <div className="livroImagem"></div>
              <div className="details">
                <div className="livroTitulo">{livro.titulo}</div>
                <div className="livroSubtitulo">{livro.autor}</div>
                <div className="livroInfo">
                  {livro.categoria.map((categoria) => (
                    <span>{categoria}</span>
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
