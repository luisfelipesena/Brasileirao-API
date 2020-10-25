# Desafio 3 - Cubos Academy -> Back End

## Utilização:

#### Para que seja possível rodar em qualquer servidor, utilizei sqls locais que inserem dados nas tabelas criadas, assim é só rodar o schema.js e o db estará pronto.

#### Deixei também disponível os meus dados do meu db no .env caso não queiram criar as tabelas em outro

1. Caso utilizem outro db diferente do meu, é necessário rodar uma vez o `node ./src/utils/schema.js`, para criação de todas as tabelas no banco de dados e a inserção do link das logos na table times (ao finalizar, aparecerá no console : `Schema.js rodado`) e modificar o `.env` para a configuração do respectivo db;
2. O `schema.js` também pode ser rodado para resetar as informações da tabela, caso editadas e caso utilizem meu db, apenas rodar o servidor normalmente com as minhas configurações do `.env`;
3. Rodar o servidor para que o front consiga realizar o `fetch()`;
4. Utilizar a mesma porta presente no `.env` de back, no `.env` de front para sincronizar os endpoints;
5. Não adicionei no `.gitignore` o `.env`, o `jogos.sql` e o `linkImagens.sql` para servir de análise e uso;
6. Também possui exemplos de como criar os sql locais iniciais dos jogos (contém insert dos usuários e jogos) e dos linkImagens (link das logos dos times inseridos)
7. No `.env` adicionei também o `EXPIRATION_TIME` que é o tempo de autenticação do user, default é `1h`
