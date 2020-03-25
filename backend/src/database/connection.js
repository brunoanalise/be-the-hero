const knex = require ('knex'); // importa o knex
const configuration = require ('../../knexfile') // importa as configuracoes do banco de dados que estao disponiveis dentro deste arquivo. o ../ serve para voltar uma pasta

const connection = knex (configuration.development); // criar a conexao utilizando o knex passando como parametro config..devee...(conexao de desenvolvimento

module.exports = connection; // exportar a conexao com o banco de dados.
