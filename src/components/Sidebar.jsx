import React from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from "react-icons/md";

import './Sidebar.scss'
import logo from '../assets/icons/heart-pulse.svg'

function Sidebar({ active }) {

    const navItems = [
        {
            label: 'Historico', path : '/historico',
        },
        {
            label: 'Estatisticas', path : '/estatisticas',
        },
    ]

    function handleClick() {
        const sidebar = document.querySelector('.main-aside');
        sidebar.classList.add('hide')
    }
    return (
        <aside className='main-aside '>
            
            <div className="top">
                <div className="logo">
                    <img src={logo} alt="logo" className="media" />
                    <h2><span className="">LO</span>GO</h2>
                </div>
                <MdClose className="close" id="close-btn" onClick={() => handleClick()}/>
            </div>
    
            <div className={'sidebar'}>
                { navItems.map(({label, path, icon}, index) => {
                    return (
                        <Link className={`sidebar__item ${path === active ? 'active' : ''}`} to={path} key={index}>
                            {icon}
                            <h3 className="sidebar__item__label"> {label} </h3>
                        </Link>
                    )
                })}
            </div>
        </aside>
    )
}

export default Sidebar