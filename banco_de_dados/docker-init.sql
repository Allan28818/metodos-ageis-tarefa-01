-- Script de inicialização para Docker
-- O database já é criado automaticamente pelo Docker
USE dbEmprestimoLivro;

-- Tabela usuario (sem foreign keys primeiro)
CREATE TABLE IF NOT EXISTS usuario
(
 id_usuario INT AUTO_INCREMENT PRIMARY KEY,
 matricula INT UNIQUE,
 senha_usuario VARCHAR(150) NOT NULL,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(50),
 telefone VARCHAR(15) NOT NULL,
 pontos DECIMAL(5,2) DEFAULT 0,
 abertura_conta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela emprestimo (sem foreign keys primeiro)
CREATE TABLE IF NOT EXISTS emprestimo
(
 id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
 dt_emprestimo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 dt_devolucao DATETIME NOT NULL,
 dt_devolucao_prevista DATE,
 status_emprestimo ENUM('ATIVO', 'ATRASADO', 'DEVOLVIDO') NOT NULL DEFAULT 'ATIVO',
 id_usuario INT,
 id_livro INT
);

-- Tabela livro
CREATE TABLE IF NOT EXISTS livro
(
 id_livro INT AUTO_INCREMENT PRIMARY KEY,
 autor VARCHAR(100) NOT NULL,
 ano_lancamento DATE,
 proprietario VARCHAR(100),
 titulo VARCHAR(50) NOT NULL,
 status_livro ENUM('DISPONÍVEL', 'EMPRESTADO', 'INDISPONÍVEL') NOT NULL DEFAULT 'DISPONÍVEL',
 num_de_livros INT NOT NULL DEFAULT 0,
 id_emprestimo INT
);

-- Tabela administrador
CREATE TABLE IF NOT EXISTS administrador
(
 id_admin INT AUTO_INCREMENT PRIMARY KEY,
 senha_admin VARCHAR(150) NOT NULL,
 id_usuario INT NOT NULL
);

-- Adicionar foreign keys depois que todas as tabelas foram criadas
ALTER TABLE livro
ADD CONSTRAINT fk_livro_emprestimo
FOREIGN KEY (id_emprestimo) REFERENCES emprestimo(id_emprestimo);

ALTER TABLE emprestimo
ADD CONSTRAINT fk_emprestimo_usuario
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

ALTER TABLE emprestimo
ADD CONSTRAINT fk_emprestimo_livro
FOREIGN KEY (id_livro) REFERENCES livro(id_livro);

ALTER TABLE administrador
ADD CONSTRAINT fk_admin_usuario
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

-- Dados de exemplo (opcional)
INSERT INTO usuario (nome, senha_usuario, email, telefone, matricula)
VALUES
('Usuário Teste', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'teste@email.com', '11999999999', 1001)
ON DUPLICATE KEY UPDATE nome=nome;
