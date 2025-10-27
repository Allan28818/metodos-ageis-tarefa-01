# 🚀 Como Executar os Testes Gherkin

Este guia explica como configurar e executar os testes BDD (Behavior Driven Development) escritos em Gherkin.

## 📋 Pré-requisitos

1. **Node.js** instalado (versão 14 ou superior)
2. **MySQL** instalado e rodando
3. **Banco de dados** criado e configurado
4. **Servidor backend** deve estar rodando durante os testes

## ⚙️ Configuração Inicial

### 1. Instalar Dependências

As dependências já foram instaladas durante a configuração, mas caso precise reinstalar:

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configuração do Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE_NAME=dbEmprestimoLivro

# Configuração JWT
SECRET_JWT=seu-secret-jwt-super-seguro

# Configuração do Servidor
PORT=3000
```

### 3. Preparar o Banco de Dados

Certifique-se de que:
- O banco de dados `dbEmprestimoLivro` existe
- A tabela `usuario` foi criada (execute o script SQL do projeto)
- O MySQL está rodando

```bash
# Verificar se MySQL está rodando (Windows)
net start MySQL80

# Ou no Linux/Mac
sudo service mysql status
```

### 4. Iniciar o Servidor Backend

**IMPORTANTE:** Os testes fazem requisições HTTP reais, então o servidor deve estar rodando.

Em um terminal separado, execute:

```bash
cd backend
npm run dev
```

Aguarde a mensagem de confirmação que o servidor está rodando em `http://localhost:3000`.

## 🧪 Executar os Testes

### Executar TODOS os Testes

```bash
npm test
```

### Executar Testes por Feature

```bash
# Testes de Registro de Usuário
npm run test:registro

# Testes de Login e Autenticação
npm run test:login

# Testes de Token JWT
npm run test:jwt

# Testes de Segurança de Senhas
npm run test:senha

# Testes de Validações e Erros
npm run test:validacoes

# Testes de Operações de Banco de Dados
npm run test:database
```

### Executar Testes por Tag

```bash
# Apenas testes de segurança
npm run test:seguranca
```

### Executar Teste Específico

```bash
# Executar um cenário específico por linha
npx cucumber-js features/01_registro_usuario.feature:10

# Executar apenas uma feature
npx cucumber-js features/02_login_autenticacao.feature
```

## 📊 Relatórios

Após executar os testes, os relatórios são gerados em:

```
backend/features/reports/
├── cucumber-report.html    # Relatório visual HTML
└── cucumber-report.json    # Relatório em JSON
```

Abra o arquivo HTML no navegador para visualizar os resultados:

```bash
# Windows
start features/reports/cucumber-report.html

# Linux/Mac
open features/reports/cucumber-report.html
```

## 🔧 Troubleshooting

### Erro: "Connection refused" ou "ECONNREFUSED"

**Problema:** O servidor backend não está rodando.

**Solução:**
```bash
cd backend
npm run dev
```

### Erro: "ER_ACCESS_DENIED_ERROR"

**Problema:** Credenciais do banco de dados incorretas.

**Solução:**
- Verifique as credenciais no arquivo `.env`
- Certifique-se de que o usuário tem permissões no banco

### Erro: "ER_BAD_DB_ERROR"

**Problema:** Banco de dados não existe.

**Solução:**
```sql
CREATE DATABASE dbEmprestimoLivro;
```

### Erro: "Table 'usuario' doesn't exist"

**Problema:** Tabela não foi criada.

**Solução:**
- Execute o script SQL do projeto em `banco_de_dados/db_emprestimo_script.sql`

### Testes Falhando com "Email já cadastrado"

**Problema:** Dados de testes anteriores no banco.

**Solução:**
```sql
-- Limpar usuários de teste
DELETE FROM usuario WHERE email LIKE '%@email.com';
```

### Erro: "Cannot find module"

**Problema:** Dependências não instaladas.

**Solução:**
```bash
cd backend
npm install
```

## 📁 Estrutura dos Arquivos de Teste

```
backend/features/
├── 01_registro_usuario.feature        # Cenários de registro
├── 02_login_autenticacao.feature      # Cenários de login
├── 03_token_jwt.feature               # Cenários de JWT
├── 04_seguranca_senhas.feature        # Cenários de bcrypt
├── 05_validacoes_erros.feature        # Cenários de validação
├── 06_operacoes_banco_dados.feature   # Cenários de BD
├── step_definitions/                   # Implementação dos steps
│   ├── common_steps.js
│   ├── registro_steps.js
│   ├── login_steps.js
│   ├── jwt_steps.js
│   ├── senha_steps.js
│   ├── validacoes_steps.js
│   └── database_steps.js
├── support/                            # Arquivos de suporte
│   ├── world.js                        # Configuração do World
│   └── helpers/
│       └── database.js                 # Helper de banco de dados
├── reports/                            # Relatórios gerados
└── README.md                           # Documentação
```

## 🎯 Exemplos de Uso

### Desenvolvimento Guiado por Testes (TDD)

1. Execute os testes antes de fazer mudanças:
```bash
npm test
```

2. Faça suas alterações no código

3. Execute os testes novamente para verificar se nada quebrou:
```bash
npm test
```

### Integração Contínua (CI)

Adicione ao seu pipeline de CI:

```yaml
# Exemplo para GitHub Actions
- name: Run Tests
  run: |
    npm install
    npm run dev &
    sleep 5
    npm test
```

### Debug de Testes

Execute com mais verbosidade:

```bash
# Modo verbose
npx cucumber-js --format @cucumber/pretty-formatter

# Com filtro por nome
npx cucumber-js --name "Login bem-sucedido"
```

## 📚 Recursos Adicionais

- **Documentação Cucumber:** https://cucumber.io/docs/cucumber/
- **Chai Assertion Library:** https://www.chaijs.com/
- **Gherkin Syntax:** https://cucumber.io/docs/gherkin/

## ✅ Checklist Antes de Executar

- [ ] Node.js instalado
- [ ] MySQL rodando
- [ ] Banco de dados criado
- [ ] Tabelas criadas
- [ ] Arquivo `.env` configurado
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor backend rodando (`npm run dev`)

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique os logs do servidor backend
2. Verifique os logs do MySQL
3. Execute os testes com `--format @cucumber/pretty-formatter` para mais detalhes
4. Consulte a documentação em `features/README.md`

---

**Última atualização:** 2025-10-27
**Versão:** 1.0.0
