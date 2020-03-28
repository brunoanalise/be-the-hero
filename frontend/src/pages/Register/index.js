import React, { useState } from 'react';

import {Link, useHistory} from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register (){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); // fazer o user voltar para tela de Login

    async function handleRegister(e) { // responsavel por fazer cadasto do usuario
        e.preventDefault(); // quando clica no cadastrar nao carrega a pagina

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
            const response = await api.post('ongs', data) // faz o cadastro e espera executar post para depois mandar a msg para o user

            alert (`Seu ID de acesso: ${response.data.id}`) // ` essa aspa é utilizada quando tem a necessidade de colocar variáveis dentro da msg

            history.push('/');

        } catch  (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>

                    <input 
                        placeholder="Nome da ONG"
                        value = {name}
                        onChange={ e => setName(e.target.value)} // valor do input
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}    
                        onChange={e=> setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}    
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
} 