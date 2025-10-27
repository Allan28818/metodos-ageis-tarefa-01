# 🚀 Guia Rápido - Executar Testes

## ⚡ Quick Start (3 passos)

### 1. Configure o ambiente (.env)

Crie o arquivo `.env` na pasta `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE_NAME=dbEmprestimoLivro
SECRET_JWT=seu-secret-jwt
PORT=3000
```

### 2. Inicie o servidor backend

```bash
cd backend
npm run dev
```

Aguarde a mensagem de confirmação do servidor.

### 3. Execute os testes (em outro terminal)

```bash
cd backend
npm test
```

## 📋 Comandos Disponíveis

```bash
# Todos os testes
npm test

# Testes específicos
npm run test:registro     # Registro de usuário
npm run test:login        # Login e autenticação
npm run test:jwt          # Token JWT
npm run test:senha        # Segurança de senhas
npm run test:validacoes   # Validações e erros
npm run test:database     # Banco de dados

# Apenas testes de segurança
npm run test:seguranca
```

## ✅ Checklist Pré-execução

- [ ] MySQL rodando
- [ ] Banco `dbEmprestimoLivro` criado
- [ ] Tabela `usuario` criada
- [ ] Arquivo `.env` configurado
- [ ] Servidor backend rodando (`npm run dev`)

## 📊 Ver Relatórios

Após executar, abra:
```
backend/features/reports/cucumber-report.html
```

## 🆘 Problemas?

Consulte o guia completo: `backend/features/COMO_EXECUTAR.md`

---

**Total de testes:** 107 cenários
**Features:** 6 arquivos
**Tempo estimado:** ~2-3 minutos
