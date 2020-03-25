// quando faz login cria uma sessão.

const connection = require ('../database/connection');

module.exports = {
    async create (request, response) {
        const { id } = request.body;

        const ong = await connection('ongs') // verifica se a ong existe
            .where('id', id)
            .select('name') // retorna somente o nome para o frontend.
            .first(); // nao retorna array, retorna somente um resultado.
        
        if ( !ong ) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }
        
        return response.json(ong);
    }
}