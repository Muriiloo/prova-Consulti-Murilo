import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Relatorio.css'

const Relatorio = () => {
    const [empresas, setEmpresas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [filtroEmpresa, setFiltroEmpresa] = useState('');
    const [filtroSetor, setFiltroSetor] = useState('');
    const [filtroAplicado, setFiltroAplicado] = useState({});
    const [resultadoFiltro, setResultadoFiltro] = useState([]);

    useEffect(() => {
        const buscarRelatorio = async () => {
            try {
                const responseEmpresas = await axios.get('http://localhost:3000/relatorio-empresas');
                const responseSetores = await axios.get('http://localhost:3000/setor.list');
                setEmpresas(responseEmpresas.data || []);
                setSetores(responseSetores.data || []);
            } catch (error) {
                console.error('Erro ao buscar relatório:', error);
                setEmpresas([]);
                setSetores([]);
            }
        };
    
        buscarRelatorio();
    }, []);
    

    const aplicarFiltro = async () => {
        setFiltroAplicado({filtroEmpresa, filtroSetor});

        const filterResponse = await axios.post('http://localhost:3000/filtrar', {
            filtroEmpresa,
            filtroSetor
        });

        setResultadoFiltro(filterResponse.data)
    };

    const renderizarOpcoesEmpresas = () => {
        const opcoesEmpresas = [];
        empresas.forEach((empresas) => {
            opcoesEmpresas.push(<option key={empresas.id} value={empresas.id}>{empresas.razao_social}</option>);

        });
        return opcoesEmpresas;
    };

    const renderizarOpcoesSetores = () => {
        const opcoesSetores = [];
        setores.forEach((setor) => {
            opcoesSetores.push(<option key={setor.id} value={setor.descricao}>{setor.descricao}</option>);
        });
        return opcoesSetores;
    };

    return (
        <div className="relatorio-container">
            <h1>Relatório de Empresas e Setores</h1>
            <div className="filtros">
                <select className='select-custom' value={filtroEmpresa} onChange={(e) => setFiltroEmpresa(e.target.value)}>
                    <option value="">Selecione uma empresa</option>
                    {renderizarOpcoesEmpresas()}
                </select>
                <select className='select-custom' value={filtroSetor} onChange={(e) => setFiltroSetor(e.target.value)}>
                    <option value="">Selecione um setor</option>
                    {renderizarOpcoesSetores()}
                </select>
                <button onClick={aplicarFiltro}>Filtrar</button>
            </div>
            <div>
                {resultadoFiltro && resultadoFiltro.map((resultado) => {
                    return (
                        <div key={resultado.nome_fantasia}>
                            <p>Nome fantasia: {resultado.nome_fantasia}</p>
                            <p>CNPJ: {resultado.cnpj}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Relatorio;
