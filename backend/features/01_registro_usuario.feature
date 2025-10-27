# language: pt
Funcionalidade: Registro de Usuário
  Como um novo usuário
  Eu quero me registrar no sistema
  Para poder acessar as funcionalidades da plataforma de empréstimo de livros

  Contexto:
    Dado que a API está rodando em "http://localhost:3000"
    E o banco de dados está acessível

  Cenário: Registro bem-sucedido com todos os campos obrigatórios
    Dado que eu tenho os seguintes dados de usuário:
      | campo    | valor                  |
      | nome     | João Silva             |
      | email    | joao.silva@email.com   |
      | senha    | senha123               |
      | telefone | 11999887766            |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 201
    E a resposta deve conter a mensagem "Usuario criado"
    E o usuário deve estar salvo no banco de dados
    E a senha deve estar criptografada no banco de dados

  Cenário: Registro bem-sucedido com matrícula opcional
    Dado que eu tenho os seguintes dados de usuário:
      | campo     | valor                  |
      | nome      | Maria Santos           |
      | email     | maria.santos@email.com |
      | senha     | senha456               |
      | telefone  | 11988776655            |
      | matricula | 123456                 |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 201
    E a resposta deve conter a mensagem "Usuario criado"

  Cenário: Falha no registro sem o campo nome
    Dado que eu tenho os seguintes dados de usuário:
      | campo    | valor                |
      | email    | teste@email.com      |
      | senha    | senha789             |
      | telefone | 11977665544          |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

  Cenário: Falha no registro sem o campo email
    Dado que eu tenho os seguintes dados de usuário:
      | campo    | valor          |
      | nome     | Pedro Oliveira |
      | senha    | senha321       |
      | telefone | 11966554433    |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

  Cenário: Falha no registro sem o campo senha
    Dado que eu tenho os seguintes dados de usuário:
      | campo    | valor                 |
      | nome     | Ana Costa             |
      | email    | ana.costa@email.com   |
      | telefone | 11955443322           |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

  Cenário: Falha no registro sem o campo telefone
    Dado que eu tenho os seguintes dados de usuário:
      | campo | valor                  |
      | nome  | Carlos Souza           |
      | email | carlos.souza@email.com |
      | senha | senha654               |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

  Cenário: Falha no registro com corpo da requisição vazio
    Dado que eu não envio nenhum dado no corpo da requisição
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

  Esquema do Cenário: Validação de campos individuais faltantes
    Dado que eu tenho dados de usuário completos exceto o campo "<campo_faltante>"
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter o erro "Dados inválidos"

    Exemplos:
      | campo_faltante |
      | nome           |
      | email          |
      | senha          |
      | telefone       |

  @seguranca
  Cenário: Verificar que a senha é criptografada com bcrypt
    Dado que eu registro um usuário com os seguintes dados:
      | campo    | valor                   |
      | nome     | Usuário Teste Bcrypt    |
      | email    | bcrypt@email.com        |
      | senha    | minhaSenhaSegura123     |
      | telefone | 11999887766             |
    Quando eu consulto o banco de dados para este usuário
    Então a senha armazenada não deve ser "minhaSenhaSegura123"
    E a senha armazenada deve começar com "$2b$10$"
    E a senha armazenada deve ter 60 caracteres
