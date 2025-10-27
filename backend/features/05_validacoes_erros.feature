# language: pt
Funcionalidade: Validações e Tratamento de Erros
  Como o sistema de API
  Eu quero validar dados de entrada e tratar erros adequadamente
  Para garantir a integridade dos dados e fornecer feedback claro aos usuários

  Contexto:
    Dado que a API está rodando em "http://localhost:3000"

  # VALIDAÇÕES DE REGISTRO
  Cenário: Validação de campos obrigatórios no registro
    Dado que eu envio uma requisição de registro sem campos obrigatórios
    Quando a validação é executada
    Então o código de resposta deve ser 400
    E a resposta deve conter "Dados inválidos"

  Cenário: Validação com campo nome vazio
    Dado que eu envio os seguintes dados:
      | campo    | valor           |
      | nome     |                 |
      | email    | teste@email.com |
      | senha    | senha123        |
      | telefone | 11999887766     |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter "Dados inválidos"

  Cenário: Validação com campo email vazio
    Dado que eu envio os seguintes dados:
      | campo    | valor        |
      | nome     | João Silva   |
      | email    |              |
      | senha    | senha123     |
      | telefone | 11999887766  |
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a resposta deve conter "Dados inválidos"

  # VALIDAÇÕES DE LOGIN
  Cenário: Validação de email e senha obrigatórios no login
    Dado que eu não envio email ou senha
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter "Email e senha são obrigatórios"

  Cenário: Validação com email vazio no login
    Dado que eu envio os seguintes dados de login:
      | campo | valor    |
      | email |          |
      | senha | senha123 |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter "Email e senha são obrigatórios"

  Cenário: Validação com senha vazia no login
    Dado que eu envio os seguintes dados de login:
      | campo | valor           |
      | email | teste@email.com |
      | senha |                 |
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a resposta deve conter "Email e senha são obrigatórios"

  # ERROS DE AUTENTICAÇÃO
  Cenário: Erro 401 para email não encontrado
    Dado que eu envio credenciais com email não cadastrado
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 401
    E a resposta deve conter "Email invalido"

  Cenário: Erro 401 para senha incorreta
    Dado que existe um usuário cadastrado
    E eu envio a senha incorreta
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 401
    E a resposta deve conter "Senha invalida"

  Cenário: Erro 401 quando ID do usuário não existe
    Dado que ocorre um problema na identificação do usuário
    Quando o sistema tenta gerar o token
    Então o código de resposta deve ser 401
    E a resposta deve conter "Erro na identificação"

  # ERROS GENÉRICOS
  Cenário: Erro genérico no login
    Dado que ocorre um erro inesperado durante o processo de login
    Quando o sistema captura a exceção
    Então o código de resposta deve ser 400
    E a resposta deve conter "Erro na tentativa do login"

  # CÓDIGOS DE STATUS HTTP
  Cenário: Código 201 para registro bem-sucedido
    Dado que eu envio dados válidos de registro
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 201
    E indica que o recurso foi criado

  Cenário: Código 200 para login bem-sucedido
    Dado que eu envio credenciais válidas
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 200
    E indica que a operação foi bem-sucedida

  Cenário: Código 400 para dados inválidos
    Dado que eu envio dados inválidos
    Quando a API processa a requisição
    Então o código de resposta deve ser 400
    E indica bad request

  Cenário: Código 401 para falha de autenticação
    Dado que eu envio credenciais inválidas
    Quando a API processa a requisição
    Então o código de resposta deve ser 401
    E indica não autorizado

  # ESTRUTURA DE RESPOSTA
  Cenário: Estrutura de resposta de erro no registro
    Dado que eu envio dados inválidos para registro
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então a resposta deve ser um JSON
    E deve conter o campo "erro"
    E o valor deve ser "Dados inválidos"

  Cenário: Estrutura de resposta de sucesso no registro
    Dado que eu envio dados válidos para registro
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então a resposta deve ser um JSON
    E deve conter o campo "message"
    E o valor deve ser "Usuario criado"

  Cenário: Estrutura de resposta de sucesso no login
    Dado que eu envio credenciais válidas
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então a resposta deve ser um JSON
    E deve conter o campo "token"
    E o token não deve estar vazio

  Cenário: Estrutura de resposta de erro no login
    Dado que eu envio email não cadastrado
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então a resposta deve ser um JSON
    E deve conter o campo "message"
    E pode conter um dos valores: "Email invalido", "Senha invalida", "Erro na identificação"

  # VALIDAÇÃO DE TIPOS DE DADOS
  Esquema do Cenário: Validação de presença de campos no registro
    Dado que eu envio dados de registro sem o campo "<campo>"
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E a validação deve identificar campo faltante

    Exemplos:
      | campo    |
      | nome     |
      | email    |
      | senha    |
      | telefone |

  Esquema do Cenário: Validação de presença de campos no login
    Dado que eu envio dados de login sem o campo "<campo>"
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E a validação deve identificar campo faltante

    Exemplos:
      | campo |
      | email |
      | senha |

  # TRATAMENTO DE CORPO VAZIO
  Cenário: Requisição de registro com corpo vazio
    Dado que eu envio uma requisição sem corpo
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então o código de resposta deve ser 400
    E deve indicar dados inválidos

  Cenário: Requisição de login com corpo vazio
    Dado que eu envio uma requisição sem corpo
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então o código de resposta deve ser 400
    E deve indicar campos obrigatórios

  # TRATAMENTO DE JSON MALFORMADO
  Cenário: Requisição com JSON inválido no registro
    Dado que eu envio um JSON malformado para registro
    Quando eu envio uma requisição POST para "/api/usuario/register"
    Então a API deve rejeitar a requisição
    E deve retornar um erro apropriado

  Cenário: Requisição com JSON inválido no login
    Dado que eu envio um JSON malformado para login
    Quando eu envio uma requisição POST para "/api/auth/login"
    Então a API deve rejeitar a requisição
    E deve retornar um erro apropriado

  # MENSAGENS DE ERRO CONSISTENTES
  Cenário: Mensagens de erro devem ser claras e consistentes
    Dado que diferentes tipos de erros podem ocorrer
    Quando o sistema retorna erros
    Então as mensagens devem ser descritivas
    E devem seguir um padrão consistente
    E não devem expor informações sensíveis

  Cenário: Validação não deve expor informações do sistema
    Dado que ocorre um erro no sistema
    Quando a API retorna a mensagem de erro
    Então a mensagem não deve conter stack traces
    E não deve conter informações de configuração
    E não deve conter detalhes do banco de dados
