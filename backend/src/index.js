const express = require('express'); // importando o modulo chamado express para dentro da variavel express
const cors = require('cors');
const routes = require('./routes'); // importar as rotas utilizando require 

const app = express(); // variavel que vai armazenar a aplicacao app

app.use(cors());
app.use(express.json()); // informar que estaremos usando json para o corpo das requisicoes. Antes de todos as requisições, eu estou falando para 
                            //o express que la no corpo da requisicao e converter para um formato entendível pela aplicação.
app.use(routes);
/**
 * Rota / Recurso (entidade ou tabala do banco que quer buscar)
 */

 /**
  * Métodos HTTP:
  * 
  * GET: Buscar/Listar uma informacao no backend.
  * POST: Criar uma informaçao no backend. Criar recurso
  * PUT: Alterar uma informacao no backend.
  * DELETE: Deletar uma informacao no backend
  */ 

  /**
   * Tipos de paramatros:
   * 
   * Query: parametros nomeados enviados na rota apos "?"  (Filtros, paginacao) ex. http://localhost:3333/users?nome=Bruno - busca os users com nome Bruno
   * Route Params: Parametros utilizados para identificar recursos. ('/users/:id'  http://localhost:3333/users/1
   * Request body: corpo da requisicao, utilizado para criar ou alterar recursos. (quando ser quer informar o email, senha... do usuario).
   */

   /**
    * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    * NoSQL: MongoDB, CouchDB, etc... nao relacionais
    * 
    */
/**
 * Driver: pacote oficial para banco para node. SELECT * FROM users
 * Query Builder: table('users').select('*').where() desta forma vai aceitar qualquer banco SQL, nao sera preciso mudar as query quando mudar de banco.
 * 
 */

/**
 * // Usando query
 */
 //  app.get('/users', (request, response) => { // recebe dois parametros... o que vier Depois da /users é chamado de recurso.
 //  const Params = request.query;  
 //      console.log (Params);
         
/**
 * // Usando route params
 */
//app.get('/users/:id', (request, response) => {
//    const params = request.params; 
//        console.log(params);

/**
 *  // Usando o request Body
 */
   // criar rota raiz, principal-- sem a rota da um erro -- Cannot GET /


app.listen(3333); // a porta ira escutar a aplicacao

