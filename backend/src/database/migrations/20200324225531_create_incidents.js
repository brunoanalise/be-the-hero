
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){ // criar tabala ongs
        table.increments(); // vai incrementando o ID da ONG

        table.string('title').notNullable(); // campo nao pode ser nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); //relacionamento com o id da tabela ongs

        table.foreign('ong_id').references('id').inTable('ongs'); // chave estrangeira ong_id referencia o id da tabela ongs. 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
