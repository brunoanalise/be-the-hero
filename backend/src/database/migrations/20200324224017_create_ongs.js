
exports.up = function(knex) { // metodo up é responsavel pela criacao da tabela
    return knex.schema.createTable('ongs', function (table){ // criar tabala ongs
        table.string('id').primary();
        table.string('name').notNullable(); // campo nao pode ser nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // tamaho do texto que vai fixar no campo uf -> 2

  });
};

exports.down = function(knex) { // metodo down é utilizado caso queira "voltar atras" da criacao de uma tabela
    knex.schema.dropTable('ongs'); // deletar tabela ongs
  
};
