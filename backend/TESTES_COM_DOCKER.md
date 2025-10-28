# 🧪 Executar Testes com Docker

Guia para executar os testes Gherkin usando containers Docker.

## 🚀 Quick Start

```bash
# 1. Subir containers (na raiz do projeto)
docker-compose up -d

# 2. Executar testes (da raiz ou pasta backend)
docker exec emprestimo-livros-backend npm test
```

## 📋 Todos os Comandos de Teste

### Executar TODOS os testes
```bash
docker exec emprestimo-livros-backend npm test
```

### Executar testes específicos por feature
```bash
# Registro de usuário (14 testes)
docker exec emprestimo-livros-backend npm run test:registro

# Login e autenticação (12 testes)
docker exec emprestimo-livros-backend npm run test:login

# Token JWT (10 testes)
docker exec emprestimo-livros-backend npm run test:jwt

# Segurança de senhas (17 testes)
docker exec emprestimo-livros-backend npm run test:senha

# Validações e erros (32 testes)
docker exec emprestimo-livros-backend npm run test:validacoes

# Operações de banco de dados (22 testes)
docker exec emprestimo-livros-backend npm run test:database
```

### Executar testes por tag
```bash
# Apenas testes de segurança
docker exec emprestimo-livros-backend npm run test:seguranca
```

### Executar teste específico
```bash
# Por linha
docker exec emprestimo-livros-backend npx cucumber-js features/01_registro_usuario.feature:10

# Por arquivo
docker exec emprestimo-livros-backend npx cucumber-js features/02_login_autenticacao.feature
```

## 📊 Ver Relatórios

Os relatórios são gerados dentro do container, mas você pode acessá-los do host:

```bash
# Copiar relatório HTML do container
docker cp emprestimo-livros-backend:/app/features/reports/cucumber-report.html ./cucumber-report.html

# Ou abrir diretamente (se tiver volume montado)
start backend/features/reports/cucumber-report.html  # Windows
open backend/features/reports/cucumber-report.html   # Mac/Linux
```

## 🔧 Configuração

Os testes já estão configurados para usar o MySQL do Docker automaticamente.

**Variáveis de ambiente no container:**
```env
DB_HOST=mysql          # Nome do serviço no docker-compose
DB_USER=root
DB_PASSWORD=root123
DB_DATABASE_NAME=dbEmprestimoLivro
SECRET_JWT=super-secret-jwt-key-change-in-production
```

## 🐛 Debug de Testes

### Ver logs em tempo real
```bash
docker exec emprestimo-livros-backend npm test 2>&1 | tee test-output.log
```

### Executar com mais verbosidade
```bash
docker exec emprestimo-livros-backend npx cucumber-js --format @cucumber/pretty-formatter
```

### Acessar shell do container
```bash
docker exec -it emprestimo-livros-backend sh
```

Dentro do container:
```bash
# Navegar para features
cd features

# Ver estrutura
ls -la

# Executar manualmente
npx cucumber-js
```

## 🔄 Workflow Completo

```bash
# 1. Subir ambiente
docker-compose up -d

# 2. Ver logs para garantir que está rodando
docker-compose logs -f backend

# 3. Aguardar inicialização (~10s)

# 4. Executar testes
docker exec emprestimo-livros-backend npm test

# 5. Ver relatórios
# Os relatórios estão em backend/features/reports/
```

## 🧹 Limpeza Entre Testes

Os testes fazem limpeza automática, mas se precisar limpar manualmente:

```bash
# Resetar banco de dados
docker exec emprestimo-livros-mysql mysql -uroot -proot123 -e "
  USE dbEmprestimoLivro;
  DELETE FROM usuario WHERE email LIKE '%@email.com';
"

# Ou resetar tudo
docker-compose down -v
docker-compose up -d
```

## 📈 Integração Contínua (CI)

Exemplo para GitHub Actions:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Start containers
        run: docker-compose up -d

      - name: Wait for services
        run: sleep 10

      - name: Run tests
        run: docker exec emprestimo-livros-backend npm test

      - name: Stop containers
        run: docker-compose down
```

## 🆘 Troubleshooting

### Testes falhando com "ECONNREFUSED"

**Problema:** Backend não consegue conectar ao MySQL.

**Solução:**
```bash
# Verificar se MySQL está healthy
docker-compose ps

# Ver logs do MySQL
docker-compose logs mysql

# Reiniciar
docker-compose restart
```

### Erro: "Cannot find module"

**Problema:** Dependências não instaladas no container.

**Solução:**
```bash
# Reconstruir imagem
docker-compose build backend
docker-compose up -d
```

### Testes lentos

**Problema:** Performance do Docker no Windows.

**Solução:**
- Use WSL2 para melhor performance
- Ou execute testes localmente:
  ```bash
  cd backend
  npm test
  ```

### Database já tem dados de testes anteriores

**Solução:**
```bash
# Limpar dados de teste
docker exec emprestimo-livros-mysql mysql -uroot -proot123 -e "
  DELETE FROM dbEmprestimoLivro.usuario WHERE email LIKE '%teste%' OR email LIKE '%@email.com';
"
```

## 💡 Dicas

1. **Use aliases** para comandos frequentes:
   ```bash
   alias dtest='docker exec emprestimo-livros-backend npm test'
   alias dlogs='docker-compose logs -f backend'
   ```

2. **Script personalizado** (criar `test.sh`):
   ```bash
   #!/bin/bash
   docker-compose up -d
   sleep 5
   docker exec emprestimo-livros-backend npm test
   docker-compose logs backend
   ```

3. **Watch mode** para desenvolvimento:
   ```bash
   # Executar testes quando arquivos mudarem
   docker exec emprestimo-livros-backend npx nodemon --exec npm test
   ```

## 📊 Estatísticas de Testes

| Feature | Testes | Tempo Estimado |
|---------|--------|----------------|
| Registro | 14 | ~15s |
| Login | 12 | ~12s |
| JWT | 10 | ~8s |
| Senhas | 17 | ~20s |
| Validações | 32 | ~30s |
| Database | 22 | ~25s |
| **TOTAL** | **107** | **~2min** |

## ✅ Checklist

- [ ] Docker rodando
- [ ] Containers iniciados (`docker-compose up -d`)
- [ ] Backend healthy (`docker-compose ps`)
- [ ] MySQL healthy (aguardar ~10s)
- [ ] Executar testes

---

**Última atualização:** 2025-10-27
**Versão:** 1.0.0
