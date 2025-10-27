# language: pt
Funcionalidade: Segurança de Senhas com Bcrypt
  Como o sistema de segurança
  Eu quero criptografar senhas usando bcrypt
  Para garantir que as senhas dos usuários estejam protegidas

  Contexto:
    Dado que a biblioteca bcrypt está disponível
    E o sistema está configurado com 10 salt rounds

  @seguranca
  Cenário: Criptografia de senha durante o registro
    Dado que um novo usuário se registra com a senha "minhaSenha123"
    Quando o sistema processa o registro
    Então a senha deve ser criptografada usando bcrypt
    E a senha armazenada deve começar com "$2b$10$"
    E a senha armazenada não deve ser igual a "minhaSenha123"
    E a senha armazenada deve ter 60 caracteres

  @seguranca
  Cenário: Hash gerado com 10 salt rounds
    Dado que um usuário se registra com a senha "senhaSegura456"
    Quando o sistema gera o hash da senha
    Então o hash deve conter o indicador de 10 salt rounds
    E o hash deve começar com "$2b$10$"

  @seguranca
  Cenário: Senhas iguais geram hashes diferentes
    Dado que um usuário se registra com a senha "senha123"
    E outro usuário se registra com a mesma senha "senha123"
    Quando o sistema gera os hashes para ambos
    Então os hashes devem ser diferentes
    E ambos os hashes devem ter 60 caracteres
    E ambos devem começar com "$2b$10$"

  @seguranca
  Cenário: Comparação de senha correta durante o login
    Dado que existe um usuário com senha criptografada no banco
    E a senha original era "senhaOriginal789"
    Quando o usuário tenta fazer login com "senhaOriginal789"
    Então o sistema deve usar bcrypt.compare para verificar
    E a comparação deve retornar verdadeiro
    E o login deve ser bem-sucedido

  @seguranca
  Cenário: Comparação de senha incorreta durante o login
    Dado que existe um usuário com senha criptografada no banco
    E a senha original era "senhaCorreta123"
    Quando o usuário tenta fazer login com "senhaErrada456"
    Então o sistema deve usar bcrypt.compare para verificar
    E a comparação deve retornar falso
    E o login deve falhar com código 401
    E a resposta deve conter "Senha invalida"

  @seguranca
  Cenário: Diferentes tipos de senhas são criptografadas corretamente
    Dado que diferentes usuários se registram com senhas:
      | tipo_senha        | senha                    |
      | curta             | abc123                   |
      | longa             | senhaSuperlonga123456    |
      | com_especiais     | S3nh@!Esp3c1@l           |
      | apenas_numeros    | 123456789                |
      | apenas_letras     | senhasenhasenha          |
    Quando o sistema criptografa cada senha
    Então todas devem ter hash de 60 caracteres
    E todas devem começar com "$2b$10$"
    E nenhuma deve ser igual à senha original

  @seguranca
  Cenário: Verificação de senha vazia ou nula
    Dado que existe um usuário com senha criptografada no banco
    Quando o usuário tenta fazer login com senha vazia ""
    Então a comparação bcrypt deve retornar falso
    E o login deve falhar

  @seguranca
  Cenário: Hash bcrypt é irreversível
    Dado que um usuário se registra com a senha "senhaIrreversivel"
    Quando o sistema gera o hash bcrypt
    Então não deve ser possível recuperar a senha original do hash
    E a única forma de verificar deve ser usando bcrypt.compare

  @seguranca
  Cenário: Tempo de processamento do bcrypt
    Dado que um usuário se registra com a senha "testeTempo123"
    Quando o sistema criptografa a senha
    Então o processo deve levar tempo significativo
    E isso deve proteger contra ataques de força bruta

  Cenário: Estrutura do hash bcrypt
    Dado que uma senha é criptografada com bcrypt
    Quando o hash é gerado
    Então o hash deve ter o formato "$2b$rounds$salt+hash"
    E deve conter exatamente 60 caracteres
    E os primeiros 7 caracteres devem ser "$2b$10$"
    E os próximos 22 caracteres devem ser o salt
    E os últimos 31 caracteres devem ser o hash

  @seguranca
  Cenário: Comparação com senha que contém caracteres especiais
    Dado que um usuário se registra com a senha "P@ssw0rd!#$%"
    E a senha é criptografada no banco
    Quando o usuário faz login com "P@ssw0rd!#$%"
    Então a comparação bcrypt deve funcionar corretamente
    E o login deve ser bem-sucedido

  @seguranca
  Cenário: Comparação case-sensitive de senhas
    Dado que um usuário se registra com a senha "SenhaComMaiuscula"
    Quando o usuário tenta fazer login com "senhacommaiuscula"
    Então a comparação bcrypt deve retornar falso
    E o login deve falhar
    E a resposta deve indicar senha inválida
