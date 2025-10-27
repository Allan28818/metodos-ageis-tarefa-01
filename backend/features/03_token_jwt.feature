# language: pt
Funcionalidade: Geração de Token JWT
  Como o sistema de autenticação
  Eu quero gerar tokens JWT válidos
  Para permitir que usuários autenticados acessem recursos protegidos

  Contexto:
    Dado que o sistema está configurado com SECRET_JWT
    E a biblioteca jsonwebtoken está disponível

  Cenário: Geração de token JWT com ID do usuário
    Dado que existe um usuário com id "123"
    Quando o sistema gera um token JWT para este usuário
    Então o token deve ser gerado com sucesso
    E o token não deve estar vazio
    E o token deve conter o payload com id "123"

  Cenário: Token JWT deve ter tempo de expiração configurado
    Dado que existe um usuário com id "456"
    Quando o sistema gera um token JWT para este usuário
    Então o token deve conter um campo de expiração
    E o tempo de expiração deve ser de 86400 segundos
    E o tempo de expiração deve ser equivalente a 24 horas

  Cenário: Token JWT deve ser assinado com SECRET_JWT
    Dado que existe um usuário com id "789"
    E o SECRET_JWT está configurado
    Quando o sistema gera um token JWT para este usuário
    Então o token deve estar assinado com o SECRET_JWT
    E o token deve ser verificável usando o mesmo SECRET_JWT

  Cenário: Estrutura do token JWT
    Dado que existe um usuário com id "321"
    Quando o sistema gera um token JWT para este usuário
    Então o token deve ter três partes separadas por ponto
    E a primeira parte deve ser o header
    E a segunda parte deve ser o payload
    E a terceira parte deve ser a assinatura

  Cenário: Payload do token deve conter apenas o ID do usuário
    Dado que existe um usuário com id "555"
    Quando o sistema gera um token JWT para este usuário
    E eu decodifico o token
    Então o payload deve conter o campo "id" com valor "555"
    E o payload deve conter o campo "iat" (issued at)
    E o payload deve conter o campo "exp" (expiration)

  Cenário: Geração de tokens diferentes para usuários diferentes
    Dado que existe um usuário com id "111"
    E existe outro usuário com id "222"
    Quando o sistema gera um token JWT para o primeiro usuário
    E o sistema gera um token JWT para o segundo usuário
    Então os tokens devem ser diferentes
    E cada token deve conter o ID correto do respectivo usuário

  Cenário: Geração de tokens diferentes em momentos diferentes
    Dado que existe um usuário com id "999"
    Quando o sistema gera um token JWT para este usuário no momento T1
    E o sistema gera outro token JWT para o mesmo usuário no momento T2
    Então os tokens devem ser diferentes
    E ambos devem conter o mesmo ID de usuário
    E ambos devem ter o campo "iat" diferente

  @seguranca
  Cenário: Token gerado após login bem-sucedido
    Dado que existe um usuário cadastrado com email "teste@email.com" e senha "senha123"
    Quando eu faço login com credenciais válidas
    Então o código de resposta deve ser 200
    E a resposta deve conter um token JWT
    E o token deve estar no campo "token"
    E o token deve ser um JWT válido

  Cenário: Validação do algoritmo de assinatura
    Dado que existe um usuário com id "777"
    Quando o sistema gera um token JWT para este usuário
    E eu decodifico o header do token
    Então o algoritmo deve ser "HS256"
    E o tipo deve ser "JWT"

  @seguranca
  Cenário: Token não deve conter informações sensíveis
    Dado que existe um usuário com id "888" e senha "senhaSecreta"
    Quando o sistema gera um token JWT para este usuário
    E eu decodifico o token
    Então o payload não deve conter a senha
    E o payload não deve conter o email
    E o payload não deve conter o telefone
    E o payload deve conter apenas o id do usuário
