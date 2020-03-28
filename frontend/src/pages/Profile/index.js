import React, {useEffect, useState} from 'react';// useEffect - serve para disparar alguma funcao em algum determinado momento do componente. por exemplo assim que ele é mostrado em tela.
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile (){
    const [incidents, setIncidents] = useState([]); // comeca com o array vazio . setIncidents - funcao para atualizar.
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
     
    useEffect(()=>  { // recebe dois parametros , o primeiro é qual funcao que eu quero que seja executada (funcao para carregar os casos), o segunndo paramentro é quando esta funcao vai ser executada
        api.get('profile', { // pegar todos os incidentes com a rota profile. 
            headers: { // passar qual é a organizacao que esta logada 
                Authorization: ongId, // nome do header da rota profile
            }
        }).then(response => { // pegar os dados 
            setIncidents(response.data); // array de retorno . gravar os dados desta resposta . SEMPRE USA O ESTADO PARA GRAVAR INFORMACOES DENTRO DELE 
        })
    }, [ongId]); // se deixar vazio, só vai executar uma vez. colocando aqui fica como uma dependencia . 

    async function handleDeleteIncident(id) { // recebe o id do caso que quer deletar
        try {
            await api.delete(`incidents/${id}` , {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id)) // manter os incidentes em que o id for diferente do que foi deletado
        } catch (err) {
            alert ('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() { // sempre no nome da funcao sempre comecar com handle, quando tem acao do usuario. 
        localStorage.clear(); // limpa o local storage que foi armazenado no logon.

        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, { ongName }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => ( // codigo javascript {}. pegar os incidents e realizar um map - percorrer cada um deles retornando alguma coisa. Para cada um dos incidents.
                                            // colocar parenteses para retornar um conteudo JSX
                    // sempre colocar key
                    <li key={incident.id}>                       
                     <strong>CASO:</strong>
                     <p>{incident.title}</p>
 
                     <strong> DESCRIÇÃO</strong>
                     <p>{incident.description}</p>
 
                     <strong>VALOR:</strong>
                     <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
 
                     <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                         <FiTrash2 size={20} color="#a8a8b3" />
                     </button>
                    </li>

                ))}
               
            </ul>

        </div>
    );
}