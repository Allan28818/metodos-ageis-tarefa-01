export const BookStorageHelper = {
  books: [
    {
      id: 1,
      titulo: "Introdução à Informática",
      autor: "Maria dos Santos",
      categoria: ["Estatística", "Python"],
      descrição:
        "Este exemplar é muito bom para quem está querendo começar a entender os conceitos de estatística e como aplicá-los na linguagem Python. Possui uma linguagem clara e simples, o que facilita muito na aprendizagem de quem tá começando no mundo dos dados.",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
    {
      id: 2,
      titulo: "Programando com Python",
      autor: "João Almeida",
      categoria: ["Python"],
      descrição: "lorem",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
    {
      id: 3,
      titulo: "Gramática Aplicada",
      autor: "Clara Ramos",
      categoria: ["Língua Portuguesa", "Escrita"],
      descrição: "lorem",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
    {
      id: 4,
      titulo: "Introdução à Informática",
      autor: "Maria dos Santos",
      categoria: ["Estatística", "Python"],
      descrição:
        "Este exemplar é muito bom para quem está querendo começar a entender os conceitos de estatística e como aplicá-los na linguagem Python. Possui uma linguagem clara e simples, o que facilita muito na aprendizagem de quem tá começando no mundo dos dados.",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
    {
      id: 5,
      titulo: "Programando com Python",
      autor: "João Almeida",
      categoria: ["Python"],
      descrição: "lorem",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
    {
      id: 6,
      titulo: "Gramática Aplicada",
      autor: "Clara Ramos",
      categoria: ["Língua Portuguesa", "Escrita"],
      descrição: "lorem",
      disponivel: true,
      postBy: "Felipe Rodrigues",
    },
  ],
  saveBook: (bookData) => {
    BookStorageHelper.books.push(bookData);
  },

  getBooks: () => {
    return BookStorageHelper.books;
  },

  getOneBook: (index) => {
    return BookStorageHelper.books.find((book) => book.id === index);
  },

  getCategorias: () => {
    const todasCategorias = BookStorageHelper.books.flatMap(
      (book) => book.categoria
    ); // junta todas as listas
    const unicas = [...new Set(todasCategorias)]; // remove duplicadas
    return unicas;
  },

  getByFilter(filtro) {
    if (filtro === "todos") {
      return BookStorageHelper.books;
    }

    return BookStorageHelper.books.filter((book) =>
      book.categoria.includes(filtro)
    );
  },

  getSearchWithFilter(search, filtro) {
    let resultado = BookStorageHelper.books;

    // Aplica filtro de categoria
    if (filtro !== "todos") {
      resultado = BookStorageHelper.getByFilter(filtro);
    }
    console.log(resultado);
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
