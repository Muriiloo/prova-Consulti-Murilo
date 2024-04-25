import React, { useState } from "react";
import axios from "axios";
import '../style/Empresa.css'
import {Link} from 'react-router-dom'

const CriarEmpresa = () => {
    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const empresaData = {
            razao_social: razaoSocial,
            nome_fantasia: nomeFantasia,
            cnpj: cnpj
        };
        try {
            
            const response = await axios.post('http://localhost:3000/empresa.add', empresaData);
            
            if (response.status === 201) {
                alert('Empresa criada com sucesso!')
                
                setRazaoSocial('');
                setNomeFantasia('');
                setCnpj('');
            }
        } catch (error) {
            alert('Erro ao cadastrar empresa:', error);
        }
    };

    return (
        <div className="container">
            <h1>Criar Empresa</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="razaoSocial">Razão Social:</label>
                    <input
                        type="text"
                        id="razaoSocial"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nomeFantasia">Nome Fantasia:</label>
                    <input
                        type="text"
                        id="nomeFantasia"
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Cadastrar Empresa</button>
                <Link to="/">
                    <button className="btn-voltar">Voltar para o Menu</button>
                </Link>
            </form>
        </div>
    );
};

export default CriarEmpresa;
