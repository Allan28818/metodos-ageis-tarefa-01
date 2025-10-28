# 🐳 Docker - Guia Completo

Execute todo o ambiente (MySQL + API) com Docker em **3 comandos**!

## ⚡ Quick Start

```bash
# 1. Configurar variáveis de ambiente
cp backend/.env.example backend/.env

# 2. Subir os containers
docker-compose up -d

# 3. Ver logs
docker-compose logs -f backend
```

Pronto! 🎉
- API rodando em: http://localhost:3000
- MySQL rodando em: localhost:3306

## 📋 Pré-requisitos

- **Docker** instalado ([Download](https://www.docker.com/get-started))
- **Docker Compose** instalado (geralmente vem com Docker Desktop)

### Verificar instalação:
```bash
docker --version
docker-compose --version
```

## 🚀 Comandos Principais

### Iniciar o ambiente completo
```bash
# Modo detached (em background)
docker-compose up -d

# Modo interativo (ver logs em tempo real)
docker-compose up
```

### Parar os containers
```bash
# Parar sem remover
docker-compose stop

# Parar e remover containers
docker-compose down

# Parar, remover containers E volumes (APAGA O BANCO!)
docker-compose down -v
```

### Ver logs
```bash
# Logs de todos os serviços
docker-compose logs -f

# Logs apenas do backend
docker-compose logs -f backend

# Logs apenas do MySQL
docker-compose logs -f mysql
```

### Reconstruir imagens
```bash
# Quando alterar o Dockerfile ou package.json
docker-compose build

# Ou reconstruir e subir
docker-compose up -d --build
```

### Reiniciar serviços
```bash
# Reiniciar todos
docker-compose restart

# Reiniciar apenas backend
docker-compose restart backend

# Reiniciar apenas MySQL
docker-compose restart mysql
```

## 🔧 Estrutura dos Containers

### Container: `emprestimo-livros-mysql`
- **Imagem:** mysql:8.0
- **Porta:** 3306
- **Database:** dbEmprestimoLivro
- **Usuário:** root
- **Senha:** root123
- **Volume:** Dados persistidos em `mysql_data`

### Container: `emprestimo-livros-backend`
- **Imagem:** Construída do Dockerfile
- **Porta:** 3000
- **Depende de:** MySQL (aguarda healthcheck)
- **Volume:** Código montado em tempo real

## 📦 Volumes

Os dados do MySQL são persistidos no volume `mysql_data`:

```bash
# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect metodos-ageis-tarefa-01_mysql_data

# CUIDADO: Remover volume (apaga dados do banco!)
docker volume rm metodos-ageis-tarefa-01_mysql_data
```

## 🔍 Comandos Úteis

### Acessar container
```bash
# Bash no container do backend
docker exec -it emprestimo-livros-backend sh

# MySQL no container do banco
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123
```

### Executar comandos no container
```bash
# Executar testes
docker exec emprestimo-livros-backend npm test

# Ver package.json
docker exec emprestimo-livros-backend cat package.json
```

### Verificar status
```bash
# Status dos containers
docker-compose ps

# Uso de recursos
docker stats
```

### Limpar tudo
```bash
# Parar e remover containers, networks e volumes
docker-compose down -v

# Remover imagens também
docker-compose down -v --rmi all
```

## 🗄️ Banco de Dados

### Acessar MySQL via terminal
```bash
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123 dbEmprestimoLivro
```

### Executar queries
```bash
# Ver tabelas
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123 -e "SHOW TABLES" dbEmprestimoLivro

# Ver usuários
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123 -e "SELECT * FROM usuario" dbEmprestimoLivro
```

### Backup do banco
```bash
docker exec emprestimo-livros-mysql mysqldump -uroot -proot123 dbEmprestimoLivro > backup.sql
```

### Restaurar backup
```bash
docker exec -i emprestimo-livros-mysql mysql -uroot -proot123 dbEmprestimoLivro < backup.sql
```

## 🧪 Executar Testes com Docker

### Opção 1: Executar testes dentro do container
```bash
# Todos os testes
docker exec emprestimo-livros-backend npm test

# Testes específicos
docker exec emprestimo-livros-backend npm run test:registro
docker exec emprestimo-livros-backend npm run test:login
```

### Opção 2: Executar testes na máquina host
```bash
# Ajustar .env para apontar para localhost
# DB_HOST=localhost (ao invés de mysql)

cd backend
npm test
```

## 🔐 Variáveis de Ambiente

O arquivo `backend/.env` deve conter:

```env
DB_HOST=mysql          # Nome do serviço no docker-compose
DB_USER=root
DB_PASSWORD=root123
DB_DATABASE_NAME=dbEmprestimoLivro
SECRET_JWT=super-secret-jwt-key-change-in-production
PORT=3000
```

**IMPORTANTE:** Para usar com Docker, `DB_HOST` deve ser `mysql` (nome do serviço).

## 🌐 Acessar a API

Após subir os containers:

- **Health Check:** http://localhost:3000
- **Registro:** POST http://localhost:3000/api/usuario/register
- **Login:** POST http://localhost:3000/api/auth/login

### Testar com curl
```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/usuario/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Docker",
    "email": "docker@email.com",
    "senha": "senha123",
    "telefone": "11999999999"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "docker@email.com",
    "senha": "senha123"
  }'
```

## 🐛 Troubleshooting

### Porta 3306 já em uso
```bash
# Parar MySQL local
net stop MySQL80  # Windows
sudo service mysql stop  # Linux/Mac

# Ou mudar a porta no docker-compose.yml
ports:
  - "3307:3306"  # Usar porta 3307 no host
```

### Porta 3000 já em uso
```bash
# Verificar o que está usando a porta
netstat -ano | findstr :3000  # Windows
lsof -i :3000  # Linux/Mac

# Ou mudar a porta no docker-compose.yml
ports:
  - "3001:3000"  # Usar porta 3001 no host
```

### Container do backend não inicia
```bash
# Ver logs detalhados
docker-compose logs backend

# Verificar se MySQL está healthy
docker-compose ps

# Reconstruir imagem
docker-compose build backend
docker-compose up -d
```

### Erro de conexão com banco
```bash
# Verificar se MySQL está rodando
docker-compose ps mysql

# Verificar logs do MySQL
docker-compose logs mysql

# Testar conexão manual
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123
```

### Resetar tudo do zero
```bash
# Parar e remover tudo
docker-compose down -v

# Remover imagens
docker-compose down -v --rmi all

# Subir novamente
docker-compose up -d --build
```

## 📊 Monitoramento

### Ver uso de recursos em tempo real
```bash
docker stats
```

### Ver logs em tempo real
```bash
docker-compose logs -f --tail=100
```

### Verificar health do MySQL
```bash
docker inspect emprestimo-livros-mysql | grep Health -A 10
```

## 🔄 Hot Reload

O código do backend é montado como volume, então mudanças no código são refletidas automaticamente (se estiver usando nodemon).

**Arquivos sincronizados:**
- `./backend/src` → `/app/src`
- `./backend/features` → `/app/features`

## 🚫 O que NÃO fazer

❌ Não commitar o arquivo `.env` com senhas reais
❌ Não usar `docker-compose down -v` em produção (apaga dados!)
❌ Não mudar a senha do MySQL depois que o volume foi criado
❌ Não expor a porta 3306 em produção (apenas 3000)

## ✅ Checklist de Produção

Para deploy em produção, altere:

- [ ] Senhas fortes em `docker-compose.yml`
- [ ] SECRET_JWT único e seguro
- [ ] Remover portas expostas desnecessárias (3306)
- [ ] Adicionar limites de recursos (memory, cpu)
- [ ] Configurar restart: always
- [ ] Usar Docker secrets ao invés de env vars
- [ ] Adicionar healthcheck no backend
- [ ] Configurar backups automáticos do MySQL

## 📚 Documentação Adicional

- **Docker:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/
- **MySQL Docker:** https://hub.docker.com/_/mysql

---

**Última atualização:** 2025-10-27
**Versão:** 1.0.0
