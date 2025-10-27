# language: pt
Funcionalidade: Login e Autenticação
  Como um usuário registrado
  Eu quero fazer login no sistema
  Para poder acessar as funcionalidades protegidas da plataforma

  Contexto:
    Dado que a API está rodando em "http://localhost:3000"
    E o banco de dados está acessível
    E existe um usuário cadastrado com os seguintes dados:
      | campo    | valor                  |
      | nome     | Usuário Teste          |
      | email    | usuario@email.com      |
      | senha    | senha123               |
      | telefone | 11999887766            |

  Cenário: Login bem-sucedido com credenciais válidas
    Dado que eu tenho as seguintes credenciais:
      | campo | valor             |
      | email | usuario@email.com |
      | senha | senha123          |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 200
    E a resposta deve conter um token JWT
    E o token não deve estar vazio

  Cenário: Falha no login com email não cadastrado
    Dado que eu tenho as seguintes credenciais:
      | campo | valor                     |
      | email | naoexiste@email.com       |
      | senha | senha123                  |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 401
    E a resposta deve conter a mensagem "Email invalido"

  Cenário: Falha no login com senha incorreta
    Dado que eu tenho as seguintes credenciais:
      | campo | valor             |
      | email | usuario@email.com |
      | senha | senhaErrada       |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 401
    E a resposta deve conter a mensagem "Senha invalida"

  Cenário: Falha no login sem o campo email
    Dado que eu tenho as seguintes credenciais:
      | campo | valor    |
      | senha | senha123 |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter a mensagem "Email e senha são obrigatórios"

  Cenário: Falha no login sem o campo senha
    Dado que eu tenho as seguintes credenciais:
      | campo | valor             |
      | email | usuario@email.com |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter a mensagem "Email e senha são obrigatórios"

  Cenário: Falha no login sem email e senha
    Dado que eu não envio credenciais no corpo da requisição
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter a mensagem "Email e senha são obrigatórios"

  Esquema do Cenário: Validação de campos obrigatórios
    Dado que eu envio uma requisição de login sem o campo "<campo_faltante>"
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter a mensagem "Email e senha são obrigatórios"

    Exemplos:
      | campo_faltante |
      | email          |
      | senha          |

  @seguranca
  Cenário: Verificação de senha usando bcrypt
    Dado que existe um usuário com senha criptografada no banco
    E eu tenho as credenciais corretas deste usuário
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 200
    E o sistema deve ter comparado a senha usando bcrypt
    E a resposta deve conter um token JWT

  Cenário: Retorno de erro genérico em caso de problema inesperado
    Dado que ocorre um erro inesperado durante o login
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter a mensagem "Erro na tentativa do login"

  @seguranca
  Cenário: Login não deve retornar senha do usuário
    Dado que eu tenho as seguintes credenciais:
      | campo | valor             |
      | email | usuario@email.com |
      | senha | senha123          |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 200
    E a resposta não deve conter a senha do usuário
    E a resposta deve conter apenas o token JWT

  Cenário: Múltiplas tentativas de login com credenciais corretas
    Dado que eu tenho as seguintes credenciais:
      | campo | valor             |
      | email | usuario@email.com |
      | senha | senha123          |
    Quando eu envio 3 requisições POST para "/api/auth/login"
    Então todas as respostas devem ter código 200
    E todas as respostas devem conter um token JWT
    E cada token deve ser válido
