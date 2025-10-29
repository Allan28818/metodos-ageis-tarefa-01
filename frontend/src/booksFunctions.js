export const BookStorageHelper = {
  books: [
    {
      id: 1,
      titulo: "Introdução à Informática",
      autor: "Vera da Gama",
      categoria: ["Ciências Exatas"],
      disponivel: true,
    },
    {
      id: 2,
      titulo: "Programando com Python",
      autor: "João Almeida",
      categoria: ["Engenharias"],
      disponivel: true,
    },
    {
      id: 3,
      titulo: "Gramática Aplicada",
      autor: "Ciça Oliveira",
      categoria: ["Engenharias"],
      disponivel: true,
    },
    {
      id: 4,
      titulo: "Gramática Aplicada",
      autor: "Ciça Oliveira",
      categoria: ["Linguística e Letras"],
      disponivel: true,
    },
  ],
  saveBook: (bookData) => {
    BookStorageHelper.books.push(bookData);
  },

  getBooks: () => {
    return BookStorageHelper.books;
  },

  getByFilter(filtro) {
    if (filtro === "todos") {
      return BookStorageHelper.books;
    }

    const categoriaMap = {
      exatas: "Ciências Exatas",
      humanas: "Ciências Humanas",
      engenharias: "Engenharias",
      linguistica: "Linguística e Letras",
    };

    const categoriaBusca = categoriaMap[filtro];

    return BookStorageHelper.books.filter((book) =>
      book.categoria.includes(categoriaBusca)
    );
  },

  getSearchWithFilter(search, filtro) {
    let resultado = BookStorageHelper.books;

    // Aplica filtro de categoria
    if (filtro !== "todos") {
      resultado = BookStorageHelper.getByFilter(filtro);
    }

    // Aplica busca por texto
    if (search && search.length > 0) {
      resultado = resultado.filter(
        (book) =>
          book.titulo.toLowerCase().includes(search.toLowerCase()) ||
          book.autor.toLowerCase().includes(search.toLowerCase())
      );
    }

    return resultado;
  },
};
