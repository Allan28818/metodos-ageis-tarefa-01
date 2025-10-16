create database dbEmprestimoLivro;
use dbEmprestimoLivro;

CREATE TABLE livro 
( 
 autor VARCHAR(100) NOT NULL,  
 id_livro INT AUTO_INCREMENT PRIMARY KEY,  
 ano_lancamento DATE,  
 proprietario VARCHAR(100),  
 titulo VARCHAR(50) NOT NULL, 
 status_livro ENUM('DISPONÍVEL', 'EMPRESTADO', 'INDISPONÍVEL') NOT NULL DEFAULT 'DISPONÍVEL', 
 num_de_livros INT NOT NULL DEFAULT 0,
 id_emprestimo INT NOT NULL,
 FOREIGN KEY (id_emprestimo) REFERENCES emprestimo(id_emprestimo)
); 

CREATE TABLE administrador 
( 
 id_admin INT AUTO_INCREMENT PRIMARY KEY,  
 senha_admin VARCHAR(150) NOT NULL,
 id_usuario INT NOT NULL,
 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
); 

CREATE TABLE emprestimo 
( 
 dt_emprestimo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  
 id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,  
 dt_devolucao DATETIME NOT NULL,  
 dt_devolucao_prevista DATE,
 status_emprestimo ENUM('ATIVO', 'ATRASADO', 'DEVOLVIDO') NOT NULL DEFAULT 'ATIVO',
 id_usuario INT NOT NULL,
 id_livro INT NOT NULL,
 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
 FOREIGN KEY (id_livro) REFERENCES livro(id_livro)
); 

CREATE TABLE usuario
( 
 senha_usuario VARCHAR(150) NOT NULL,  
 nome VARCHAR(100) NOT NULL,  
 id_usuario INT AUTO_INCREMENT,
 matricula INT PRIMARY KEY,  
 email VARCHAR(50),  
 telefone VARCHAR(15) NOT NULL,
 pontos DECIMAL(5,2) DEFAULT 0,
 abertura_conta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
 id_emprestimo INT NOT NULL,
 FOREIGN KEY (id_emprestimo) REFERENCES emprestimo(id_emprestimo)
); 
