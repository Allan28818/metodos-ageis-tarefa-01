# 🐳 Início Rápido com Docker

Execute todo o projeto (MySQL + API) em **3 comandos**!

## ⚡ Quick Start

```bash
# 1. Copiar configuração
cp backend/.env.example backend/.env

# 2. Subir containers
docker-compose up -d

# 3. Verificar
docker-compose ps
```

✅ **Pronto!**
- API: http://localhost:3000
- MySQL: localhost:3306

## 📋 Comandos Essenciais

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f backend

# Executar testes
docker exec emprestimo-livros-backend npm test

# Acessar MySQL
docker exec -it emprestimo-livros-mysql mysql -uroot -proot123 dbEmprestimoLivro

# Reiniciar tudo
docker-compose restart
```

## 🔧 Credenciais Padrão

**MySQL:**
- Host: localhost (ou `mysql` dentro do container)
- Porta: 3306
- Usuário: root
- Senha: root123
- Database: dbEmprestimoLivro

**API:**
- Porta: 3000
- JWT Secret: super-secret-jwt-key-change-in-production

## 🧪 Testar a API

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/usuario/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@email.com",
    "senha": "senha123",
    "telefone": "11999999999"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "senha": "senha123"
  }'
```

## 📖 Documentação Completa

Para mais detalhes, consulte: **[DOCKER.md](./DOCKER.md)**

## 🆘 Problemas?

```bash
# Ver logs
docker-compose logs

# Resetar tudo
docker-compose down -v
docker-compose up -d --build
```

## 📁 Estrutura

```
.
├── docker-compose.yml          # Orquestração dos containers
├── backend/
│   ├── Dockerfile             # Imagem do backend
│   ├── .env                   # Configuração (criar a partir do .env.example)
│   └── src/                   # Código da API
└── banco_de_dados/
    └── docker-init.sql        # Script de inicialização do BD
```

---

🎯 **Tudo configurado!** Agora você pode desenvolver sem se preocupar com MySQL local.
