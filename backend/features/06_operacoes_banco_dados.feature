# language: pt
Funcionalidade: Operações de Banco de Dados
  Como o sistema backend
  Eu quero realizar operações no banco de dados
  Para persistir e recuperar dados de usuários de forma segura

  Contexto:
    Dado que o banco de dados "dbEmprestimoLivro" está acessível
    E a conexão com MySQL está configurada
    E a tabela "usuario" existe

  # CONEXÃO COM BANCO DE DADOS
  Cenário: Estabelecer conexão com o banco de dados
    Dado que as credenciais do banco estão configuradas
    Quando o servidor inicia
    Então a conexão com o banco deve ser estabelecida
    E um pool de conexões deve ser criado com limite de 10
    E a mensagem de sucesso deve ser exibida

  Cenário: Falha na conexão com banco de dados
    Dado que as credenciais do banco estão incorretas
    Quando o servidor tenta conectar
    Então deve ocorrer um erro de conexão
    E o erro deve ser logado no console
    E a mensagem deve conter "Erro ao conectar no banco de dados"

  Cenário: Configuração de pool de conexões
    Dado que o banco está configurado
    Quando o sistema cria o pool de conexões
    Então o limite de conexões deve ser 10
    E as configurações devem incluir host, user, password e database

  # OPERAÇÃO: BUSCAR USUÁRIO POR EMAIL
  Cenário: Buscar usuário existente por email
    Dado que existe um usuário com email "usuario@email.com" no banco
    Quando o sistema executa getByEmail("usuario@email.com")
    Então a query SQL deve ser "SELECT id_usuario, email, senha_usuario FROM usuario WHERE email = ?"
    E o resultado deve conter o id_usuario
    E o resultado deve conter o email
    E o resultado deve conter a senha_usuario criptografada

  Cenário: Buscar usuário inexistente por email
    Dado que não existe usuário com email "inexistente@email.com"
    Quando o sistema executa getByEmail("inexistente@email.com")
    Então a query deve ser executada
    E o resultado deve ser vazio
    E nenhum erro deve ser lançado

  Cenário: Estrutura de retorno do getByEmail
    Dado que existe um usuário no banco
    Quando o sistema busca este usuário por email
    Então o retorno deve ser um array
    E o primeiro elemento deve conter id_usuario
    E o primeiro elemento deve conter email
    E o primeiro elemento deve conter senha_usuario
    E não deve retornar outros campos como telefone ou nome

  @seguranca
  Cenário: Query parametrizada no getByEmail
    Dado que o sistema busca um usuário por email
    Quando a query SQL é executada
    Então o email deve ser passado como parâmetro "?"
    E não deve haver concatenação direta de strings
    E isso previne SQL injection

  # OPERAÇÃO: CRIAR USUÁRIO
  Cenário: Criar novo usuário com sucesso
    Dado que eu tenho dados válidos de usuário:
      | nome     | João Silva          |
      | email    | joao@email.com      |
      | senha    | senha123            |
      | telefone | 11999887766         |
    Quando o sistema executa create(user)
    Então a query SQL deve ser "INSERT INTO usuario (nome, senha_usuario, email, telefone) VALUES (?)"
    E a senha deve ser criptografada antes da inserção
    E o usuário deve ser inserido no banco
    E a função deve retornar um resultado de inserção

  Cenário: Criptografia de senha antes da inserção
    Dado que eu crio um usuário com senha "senhaPlainText"
    Quando o sistema executa create(user)
    Então a senha deve ser hasheada usando bcrypt
    E o hash deve usar 10 salt rounds
    E a senha original não deve ser inserida no banco
    E apenas o hash deve ser armazenado

  Cenário: Estrutura dos dados inseridos
    Dado que eu crio um usuário com todos os campos
    Quando o sistema executa a query INSERT
    Então os campos devem ser na ordem: nome, senha_usuario, email, telefone
    E a senha_usuario deve estar criptografada
    E todos os valores devem ser passados como parâmetros

  @seguranca
  Cenário: Query parametrizada no create
    Dado que o sistema cria um novo usuário
    Quando a query INSERT é executada
    Então os valores devem ser passados como array de parâmetros
    E não deve haver concatenação de strings na query
    E isso previne SQL injection

  # CAMPOS DO BANCO DE DADOS
  Cenário: Campos retornados na busca por email
    Dado que o sistema busca um usuário
    Quando a query SELECT é executada
    Então apenas os campos necessários devem ser retornados
    E os campos devem ser: id_usuario, email, senha_usuario
    E campos sensíveis como telefone não devem ser retornados desnecessariamente

  Cenário: Campos inseridos no registro
    Dado que um novo usuário é registrado
    Quando a query INSERT é executada
    Então os campos inseridos devem ser: nome, senha_usuario, email, telefone
    E o id_usuario deve ser gerado automaticamente
    E o campo pontos deve ter valor padrão 0
    E o campo abertura_conta deve ter timestamp automático

  # INTEGRIDADE DE DADOS
  Cenário: Verificar senha criptografada no banco
    Dado que um usuário foi criado com senha "minhasenha"
    Quando eu consulto o banco de dados
    Então a senha armazenada deve começar com "$2b$10$"
    E deve ter 60 caracteres
    E não deve ser igual a "minhasenha"

  Cenário: Verificar dados completos após inserção
    Dado que eu crio um usuário com nome "Maria Silva"
    Quando a inserção é concluída
    E eu busco este usuário por email
    Então o nome deve estar correto no banco
    E o email deve estar correto
    E a senha deve estar criptografada
    E o telefone deve estar armazenado

  # TRANSAÇÕES E CONSISTÊNCIA
  Cenário: Inserção bem-sucedida retorna resultado
    Dado que eu crio um novo usuário válido
    Quando o sistema executa create(user)
    Então a operação deve retornar um resultado
    E o resultado deve indicar sucesso da inserção
    E deve ser possível obter o ID do usuário inserido

  Cenário: Uso de connection pool para múltiplas requisições
    Dado que múltiplas requisições chegam simultaneamente
    Quando o sistema processa as requisições
    Então o pool de conexões deve gerenciar as conexões
    E não deve exceder o limite de 10 conexões
    E as conexões devem ser reutilizadas eficientemente

  # CONFIGURAÇÃO DO BANCO
  Cenário: Configuração padrão do banco de dados
    Dado que o sistema usa configuração padrão
    Quando o banco é inicializado
    Então o host deve ser "localhost"
    E o usuário deve ser "root"
    E a senha deve ser vazia ""
    E o database deve ser "dbEmprestivoLivro"

  Cenário: Configuração via variáveis de ambiente
    Dado que existem variáveis de ambiente configuradas
    Quando o sistema lê a configuração
    Então deve usar DB_HOST se definido
    E deve usar DB_USER se definido
    E deve usar DB_PASSWORD se definido
    E deve usar DB_DATABASE_NAME se definido

  # ESTRUTURA DA TABELA USUARIO
  Cenário: Estrutura da tabela usuario
    Dado que a tabela "usuario" existe no banco
    Então ela deve ter o campo "id_usuario" como INT AUTO_INCREMENT
    E deve ter o campo "matricula" como INT PRIMARY KEY
    E deve ter o campo "nome" como VARCHAR(100) NOT NULL
    E deve ter o campo "senha_usuario" como VARCHAR(150) NOT NULL
    E deve ter o campo "email" como VARCHAR(50)
    E deve ter o campo "telefone" como VARCHAR(15) NOT NULL
    E deve ter o campo "pontos" como DECIMAL(5,2) com default 0
    E deve ter o campo "abertura_conta" como DATETIME com default CURRENT_TIMESTAMP

  # OPERAÇÕES SQL ESPECÍFICAS
  Cenário: Query SELECT com WHERE parametrizado
    Dado que o sistema busca usuário por email
    Quando a query é construída
    Então deve ser "SELECT id_usuario, email, senha_usuario FROM usuario WHERE email = ?"
    E o placeholder "?" previne SQL injection
    E o valor do email é passado separadamente

  Cenário: Query INSERT com VALUES parametrizado
    Dado que o sistema insere novo usuário
    Quando a query é construída
    Então deve ser "INSERT INTO usuario (nome, senha_usuario, email, telefone) VALUES (?)"
    E o placeholder "?" recebe array de valores
    E os valores são passados de forma segura

  # PERFORMANCE E OTIMIZAÇÃO
  Cenário: Uso eficiente de índices
    Dado que a busca é feita por email
    Quando múltiplas buscas são realizadas
    Então a query deve ser eficiente
    E deve aproveitar índices se configurados
    E o campo email é candidato a ter índice

  Cenário: Pool de conexões melhora performance
    Dado que múltiplas requisições são feitas
    Quando o sistema usa pool de conexões
    Então as conexões devem ser reutilizadas
    E não deve haver overhead de criar nova conexão a cada requisição
    E o limite de 10 conexões evita sobrecarga
