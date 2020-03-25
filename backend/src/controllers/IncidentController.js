const connection = require ('../database/connection');

module.exports = {
    async index (request, response){
        const { page = 1} = request.query; // buscar na pagina 1

        const [count] = await connection('incidents').count();
        console.log(count);
            
        const incidents = await connection ('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // trazer os dados da tabela ongs, onde o id seja igual ao incidents.id, dados da ong relacionados com o incidente
        .limit(5) // limitar trazer 5 registros (incidentes)
        .offset(( page - 1) * 5) // pular 5 registros por pagina , 5 - 10 - 15 etc // http://localhost:3333/incidents?page=2 // http://localhost:3333/incidents?page=3 (esquema de paginacao)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']); // mostra no header o total de resgistros no campo X-Total-Count

        return response.json(incidents);
    },

    async create (request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({ 
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete (request, response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization; // verifica se existe o incident criado pela ong antes de deletar

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id){
            return response.status (401).json({ error: 'Operation not permitted.' });
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // retorna uma msg de sucesso porem sem conteudo
    }
}