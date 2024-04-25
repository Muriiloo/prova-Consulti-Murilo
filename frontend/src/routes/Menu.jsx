import React from "react";
import { Link } from "react-router-dom";
import "../style/Menu.css";

const Menu = () => {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="/criar-empresa" className="menu-link">Criar Empresa</Link>
                </li>
                <li className="menu-item">
                    <Link to="/criar-setor" className="menu-link">Criar Setor</Link>
                </li>
                <li className="menu-item">
                    <Link to="/relatorio" className="menu-link">Relatório</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu;
