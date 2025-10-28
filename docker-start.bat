@echo off
echo ================================
echo   Iniciando ambiente Docker
echo ================================
echo.

REM Verificar se .env existe
if not exist backend\.env (
    echo Criando arquivo .env...
    copy backend\.env.example backend\.env
    echo Arquivo .env criado!
    echo.
)

REM Subir containers
echo Subindo containers...
docker-compose up -d

echo.
echo Aguardando servicos iniciarem...
timeout /t 5 /nobreak > nul

REM Verificar status
echo.
echo Status dos containers:
docker-compose ps

echo.
echo ================================
echo   Ambiente iniciado com sucesso!
echo ================================
echo.
echo Servicos disponiveis:
echo   - API: http://localhost:3000
echo   - MySQL: localhost:3306
echo.
echo Comandos uteis:
echo   - Ver logs: docker-compose logs -f backend
echo   - Executar testes: docker exec emprestimo-livros-backend npm test
echo   - Parar: docker-compose down
echo.
pause
