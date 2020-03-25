const connection = require ('../database/connection'); // importa a conexao com o banco

const crypto = require('crypto'); // criar id da ONG usa o pacote crypto importa. ELe gera uma string aleatória , texto aleatorio, varios caracteres juntos.

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body; // pegar o corpo da requisicao usa o request
    
        const id = crypto.randomBytes(4).toString('HEX'); // gera ID com 4 bytes de caracteres aleatorios, e converte os caracteres em uma string do tipo hexadecimal (numeros e letras)
    
        await connection('ongs').insert ({ // com o await quando o node chegar neste codigo, ele vai aguardar esse trecho de codigo finalizar para depois ele continuar 
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id }); // devolve s[o o ID ... Quando a ONG se cadastra na aplicacao ela precisa saber o ID que foi atribuido a ela, como se fosse um CPF ou cnpj.é este ID que ela vai usar para se conectar a aplicacao
        }
}