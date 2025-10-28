 import { useState } from 'react';
 import { FiBook, FiClock  } from "react-icons/fi";
 import { GrHomeRounded } from "react-icons/gr";
import { GoBell } from "react-icons/go";
import { HiUser } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import {storageHelper } from './userFunctions.js';
import "./sideBar.css"


 export default function MenuSidebar({ pageAtive}){
const [menuAtivo] = useState(pageAtive);
const navigate = useNavigate();
const menuItens = [
   { label: 'Início', icon: GrHomeRounded, link: '/' },
    { label: 'Meus Empréstimos', icon: FiBook , link: '/meus-emprestimos' },
    { label: 'Histórico', icon: FiClock  , link: '/historico' },
    { label: 'Notificações', icon: GoBell, link: '/notificacoes' },
    { label: 'Perfil', icon: HiUser, link : '/perfil' },
];
const handleMenuClick = (link) => {
    navigate(link);
}
const handleLogout = () => {
    storageHelper.logout();
    navigate('/login');
}

 return (
    <div className='sidebar'>
      <div className='header'>
        <div className='logo'>
          <img src="/logo.jpg" alt="UCB - Livros Emprestados" />
        </div>
      </div>

      <nav >
        {menuItens.map((item) => (
          <button
            key={item.label}
            onClick={() => handleMenuClick(item.link)}
            className={`menuItem${menuAtivo === item.label ? '-menuActive' : ''}`}
          >
            
           <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className='sidebarFooter'>
        <button
          onClick={handleLogout}
          className='LogoutButton'
        >
          Sair da conta
        </button>
        <div className='footer' >
          <p>© 2025 Equipe A — Métodos Ágeis
          UCB Livros Emprestados
          Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}