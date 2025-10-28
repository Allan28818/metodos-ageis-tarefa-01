#!/bin/bash

echo "🐳 Iniciando ambiente Docker..."
echo ""

# Verificar se .env existe
if [ ! -f backend/.env ]; then
    echo "📝 Criando arquivo .env..."
    cp backend/.env.example backend/.env
    echo "✅ Arquivo .env criado!"
    echo ""
fi

# Subir containers
echo "🚀 Subindo containers..."
docker-compose up -d

echo ""
echo "⏳ Aguardando serviços iniciarem..."
sleep 5

# Verificar status
echo ""
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "✅ Ambiente iniciado com sucesso!"
echo ""
echo "🌐 Serviços disponíveis:"
echo "   - API: http://localhost:3000"
echo "   - MySQL: localhost:3306"
echo ""
echo "📋 Comandos úteis:"
echo "   - Ver logs: docker-compose logs -f backend"
echo "   - Executar testes: docker exec emprestimo-livros-backend npm test"
echo "   - Parar: docker-compose down"
echo ""
