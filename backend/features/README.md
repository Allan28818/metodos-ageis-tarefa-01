# Testes BDD com Gherkin - Backend

Este diretório contém os testes em Gherkin (BDD - Behavior Driven Development) para todas as funcionalidades implementadas no backend da aplicação de empréstimo de livros.

## 📋 Estrutura dos Testes

Os testes estão organizados em 6 features principais, cada uma cobrindo um aspecto específico do sistema:

### 1️⃣ **01_registro_usuario.feature**
**Funcionalidade:** Registro de Usuário

**Cobertura:**
- ✅ Registro bem-sucedido com campos obrigatórios (nome, email, senha, telefone)
- ✅ Registro com campo opcional (matrícula)
- ✅ Validação de campos faltantes (cada campo obrigatório)
- ✅ Tratamento de corpo vazio
- ✅ Criptografia bcrypt da senha (verificação com $2b$10$ e 60 caracteres)

**Cenários:** 10 cenários + 1 esquema com 4 exemplos = 14 testes

**Arquivo:** `backend/src/controllers/user.controller.js`, `backend/src/services/user.service.js`

---

### 2️⃣ **02_login_autenticacao.feature**
**Funcionalidade:** Login e Autenticação

**Cobertura:**
- ✅ Login bem-sucedido com credenciais válidas
- ✅ Validação de email não cadastrado (401 - "Email invalido")
- ✅ Validação de senha incorreta (401 - "Senha invalida")
- ✅ Validação de campos obrigatórios (email e senha)
- ✅ Geração de token JWT
- ✅ Comparação de senha com bcrypt
- ✅ Tratamento de erros inesperados
- ✅ Múltiplas tentativas de login

**Cenários:** 10 cenários + 1 esquema com 2 exemplos = 12 testes

**Arquivo:** `backend/src/controllers/auth.controller.js`, `backend/src/services/auth.service.js`

---

### 3️⃣ **03_token_jwt.feature**
**Funcionalidade:** Geração de Token JWT

**Cobertura:**
- ✅ Geração de token com ID do usuário
- ✅ Configuração de expiração (86400 segundos / 24 horas)
- ✅ Assinatura com SECRET_JWT
- ✅ Estrutura do token (header.payload.signature)
- ✅ Payload contendo apenas ID, iat e exp
- ✅ Tokens diferentes para usuários diferentes
- ✅ Tokens diferentes em momentos diferentes
- ✅ Algoritmo HS256
- ✅ Token não contém informações sensíveis

**Cenários:** 10 cenários

**Arquivo:** `backend/src/services/auth.service.js`

---

### 4️⃣ **04_seguranca_senhas.feature**
**Funcionalidade:** Segurança de Senhas com Bcrypt

**Cobertura:**
- ✅ Criptografia com bcrypt durante registro
- ✅ Hash com 10 salt rounds ($2b$10$)
- ✅ Senhas iguais geram hashes diferentes
- ✅ Comparação correta durante login (bcrypt.compare)
- ✅ Comparação retorna falso para senha incorreta
- ✅ Diferentes tipos de senhas (curta, longa, especiais, números, letras)
- ✅ Hash irreversível
- ✅ Comparação case-sensitive
- ✅ Estrutura do hash (60 caracteres)

**Cenários:** 12 cenários + 1 esquema com 5 exemplos = 17 testes

**Arquivo:** `backend/src/services/user.service.js`, `backend/src/services/auth.service.js`

---

### 5️⃣ **05_validacoes_erros.feature**
**Funcionalidade:** Validações e Tratamento de Erros

**Cobertura:**
- ✅ Validação de campos obrigatórios (registro e login)
- ✅ Validação de campos vazios
- ✅ Códigos HTTP corretos (200, 201, 400, 401)
- ✅ Estrutura de resposta JSON (erro/message/token)
- ✅ Mensagens de erro consistentes
- ✅ Corpo vazio e JSON malformado
- ✅ Erros não expõem informações sensíveis

**Cenários:** 26 cenários + 2 esquemas (4+2 exemplos) = 32 testes

**Arquivo:** `backend/src/controllers/auth.controller.js`, `backend/src/controllers/user.controller.js`

---

### 6️⃣ **06_operacoes_banco_dados.feature**
**Funcionalidade:** Operações de Banco de Dados

**Cobertura:**
- ✅ Conexão com MySQL (pool de 10 conexões)
- ✅ Busca de usuário por email (getByEmail)
- ✅ Criação de usuário (create)
- ✅ Queries parametrizadas (prevenção de SQL injection)
- ✅ Estrutura da tabela usuario
- ✅ Campos retornados (id_usuario, email, senha_usuario)
- ✅ Campos inseridos (nome, senha_usuario, email, telefone)
- ✅ Configuração via variáveis de ambiente
- ✅ Integridade e consistência de dados

**Cenários:** 22 cenários

**Arquivo:** `backend/src/database/connection.js`, `backend/src/config/database.js`, `backend/src/services/user.service.js`

---

## 📊 Resumo Estatístico

| Feature | Cenários | Testes Totais | Tags Especiais |
|---------|----------|---------------|----------------|
| Registro de Usuário | 10 | 14 | @seguranca |
| Login e Autenticação | 10 | 12 | @seguranca |
| Token JWT | 10 | 10 | @seguranca |
| Segurança de Senhas | 12 | 17 | @seguranca |
| Validações e Erros | 26 | 32 | - |
| Operações BD | 22 | 22 | @seguranca |
| **TOTAL** | **90** | **107** | **-** |

## 🏷️ Tags Utilizadas

- **@seguranca**: Cenários relacionados à segurança (bcrypt, JWT, SQL injection)

## 🎯 Cobertura Funcional

### ✅ Funcionalidades Testadas

1. **Registro de Usuário (POST /api/usuario/register)**
   - Validação de campos obrigatórios
   - Criptografia de senha
   - Inserção no banco de dados

2. **Login (POST /api/auth/login)**
   - Validação de credenciais
   - Comparação de senha com bcrypt
   - Geração de token JWT
   - Tratamento de erros

3. **Autenticação JWT**
   - Geração de token
   - Estrutura do payload
   - Tempo de expiração
   - Assinatura

4. **Segurança**
   - Bcrypt com 10 salt rounds
   - Hashes diferentes para mesma senha
   - Comparação segura
   - Queries parametrizadas

5. **Banco de Dados**
   - Pool de conexões
   - SELECT e INSERT
   - Integridade de dados
   - Configuração

## 🚀 Como Usar

### Pré-requisitos

Para executar estes testes, você precisará de uma ferramenta de execução BDD como:

- **Cucumber** (JavaScript/Node.js)
- **Behave** (Python)
- **SpecFlow** (.NET)
- **Behat** (PHP)

### Exemplo de Execução com Cucumber (Node.js)

1. Instale as dependências:
```bash
npm install --save-dev @cucumber/cucumber
```

2. Crie os step definitions em `backend/features/step_definitions/`

3. Execute os testes:
```bash
npx cucumber-js
```

### Exemplo de Execução de Cenários Específicos

```bash
# Executar apenas testes de segurança
npx cucumber-js --tags @seguranca

# Executar feature específica
npx cucumber-js features/01_registro_usuario.feature

# Executar cenário específico por linha
npx cucumber-js features/02_login_autenticacao.feature:15
```

## 📝 Formato Gherkin

Todos os arquivos seguem o padrão Gherkin em português:

```gherkin
# language: pt
Funcionalidade: Nome da Funcionalidade
  Como [ator]
  Eu quero [ação]
  Para [benefício]

  Contexto:
    Dado que [condição inicial comum]

  Cenário: Nome do cenário
    Dado que [pré-condição]
    Quando [ação]
    Então [resultado esperado]
```

## 🔍 Mapeamento de Endpoints

| Endpoint | Método | Feature | Controller |
|----------|--------|---------|------------|
| `/api/usuario/register` | POST | 01_registro_usuario | user.controller.js |
| `/api/auth/login` | POST | 02_login_autenticacao | auth.controller.js |

## 📚 Referências de Código

### Controllers
- `backend/src/controllers/auth.controller.js:login` - Implementação do login
- `backend/src/controllers/user.controller.js:register` - Implementação do registro

### Services
- `backend/src/services/auth.service.js:generateToken` - Geração de JWT
- `backend/src/services/auth.service.js:verifyPassword` - Verificação bcrypt
- `backend/src/services/user.service.js:getByEmail` - Busca por email
- `backend/src/services/user.service.js:create` - Criação de usuário

### Database
- `backend/src/database/connection.js` - Pool de conexões
- `backend/src/config/database.js` - Configuração do banco

## ⚠️ Notas Importantes

### Funcionalidades NÃO Implementadas (Excluídas dos Testes)

Os seguintes cenários **NÃO foram incluídos** pois as funcionalidades não estão implementadas:

- ❌ Validação de email duplicado
- ❌ Validação de formato de email
- ❌ Validação de formato de telefone
- ❌ Validação de força de senha
- ❌ Middleware de autenticação JWT
- ❌ Rotas protegidas
- ❌ Rate limiting
- ❌ CORS configurado

### Vulnerabilidades Conhecidas

**ATENÇÃO:** O sistema atual possui vulnerabilidades que devem ser corrigidas:

1. **SQL Injection** - Queries não são completamente parametrizadas
2. **Email duplicado** - Sistema permite emails duplicados
3. **Formato de dados** - Não valida formato de email/telefone
4. **Senha fraca** - Aceita senhas muito simples

## 📧 Contato

Para dúvidas sobre os testes, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.

---

**Última atualização:** 2025-10-27
**Versão:** 1.0.0
**Status:** ✅ Completo para funcionalidades implementadas
