## Instruções

Crie o banco de dados no seu MySql local
Após isso crie um arquivo .env dentro da pasta src, no seguinte formato:

```
VAR = <VALOR>
```

Valores aceitaveis:

- DB_HOST: Especifica o host para uso no codigo. Se não colocado, será por padrão localhost (Opcional)
- DB_USER: Especifica o user para login no MySql. Se não colocado, será por padrão root (Opcional)
- DB_PASSWORD: Especifica a senha para login no MySql.
- DB_DATABASE_NAME: Especifica o nome do Database usado na aplicação. Por padrão será "dbEmprestimoLivro" (Opcional)
- SECRET_JWT: Uma string utilizada para criptografar carimbar tokens jwt

### Rodando

Existem duas formas de rodar a aplicação:

Em ambiente de desenvolvimento:
```
npm run dev
```

E em ambiente de produção:
```
npm start
```

Após isso, deve aparecer a seguinte mensagem no console:
```sh
[SUCCESS] Teste de conexão ao banco de dados foi concluido
```

Caso contrário, verifique o erro. Caso seja com o banco de dados, aparecerá algo assim:
```sh
[ERROR] Erro ao conectar no banco de dados: <MENSAGEM_DO_ERRO>
```

Envie contato caso algum erro desconhecido aconteça