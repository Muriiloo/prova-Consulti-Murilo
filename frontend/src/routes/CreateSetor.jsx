import React, { useState } from "react";
import axios from "axios";
import '../style/Setor.css'
import {Link} from 'react-router-dom'

const CriarSetor = () => {
    const [descricao, setDescricao] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/setor.add', { descricao });

            if (response.status === 201) {
                setDescricao("");
                alert('Setor criado com sucesso!');
            }
        } catch (error) {
            alert('Erro ao criar setor: ' + error.response.data);
        }
    };

    return (
        <div className="container">
            <h1>Criar Setor</h1>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="descricao" className="label">Descrição do Setor:</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Criar Setor</button>
                <Link to="/">
                    <button className="btn-voltar">Voltar para o Menu</button>
                </Link>
            </form>
        </div>
    );
};

export default CriarSetor;
