# Makefile para facilitar comandos Docker

.PHONY: help start stop restart logs build test clean reset shell mysql

# Comando padrão
help:
	@echo "Comandos disponíveis:"
	@echo "  make start     - Iniciar containers"
	@echo "  make stop      - Parar containers"
	@echo "  make restart   - Reiniciar containers"
	@echo "  make logs      - Ver logs do backend"
	@echo "  make build     - Reconstruir imagens"
	@echo "  make test      - Executar testes"
	@echo "  make clean     - Parar e remover containers"
	@echo "  make reset     - Resetar tudo (apaga dados!)"
	@echo "  make shell     - Abrir shell no container backend"
	@echo "  make mysql     - Abrir MySQL CLI"

# Iniciar containers
start:
	@echo "🚀 Iniciando containers..."
	@docker-compose up -d
	@echo "✅ Containers iniciados!"
	@echo "   - API: http://localhost:3000"
	@echo "   - MySQL: localhost:3306"

# Parar containers
stop:
	@echo "🛑 Parando containers..."
	@docker-compose stop
	@echo "✅ Containers parados!"

# Reiniciar containers
restart:
	@echo "🔄 Reiniciando containers..."
	@docker-compose restart
	@echo "✅ Containers reiniciados!"

# Ver logs
logs:
	@docker-compose logs -f backend

# Reconstruir imagens
build:
	@echo "🔨 Reconstruindo imagens..."
	@docker-compose build
	@echo "✅ Imagens reconstruídas!"

# Executar testes
test:
	@echo "🧪 Executando testes..."
	@docker exec emprestimo-livros-backend npm test

# Parar e remover containers
clean:
	@echo "🧹 Limpando containers..."
	@docker-compose down
	@echo "✅ Containers removidos!"

# Resetar tudo (cuidado!)
reset:
	@echo "⚠️  ATENÇÃO: Isso vai apagar todos os dados do banco!"
	@read -p "Tem certeza? (yes/no): " confirm && [ "$$confirm" = "yes" ] || exit 1
	@docker-compose down -v
	@docker-compose up -d --build
	@echo "✅ Ambiente resetado!"

# Abrir shell no container
shell:
	@docker exec -it emprestimo-livros-backend sh

# Abrir MySQL CLI
mysql:
	@docker exec -it emprestimo-livros-mysql mysql -uroot -proot123 dbEmprestimoLivro
