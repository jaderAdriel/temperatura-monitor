import React from 'react'
import { MdMenu } from "react-icons/md";
import { useLocation } from 'react-router-dom'

import './Navbar.scss'

function Navbar({changeTheme}) {

    function handleClick() {
        const sidebar = document.querySelector('.main-aside');
        if (sidebar.classList.contains('hide')) {
            sidebar.classList.remove('hide');
        }
        sidebar.style.display = 'block';
    }

    return (
        <div className="navbar">
            <button id="menu-btn">
                <MdMenu className="close" id="" onClick={(e) => handleClick()}/>
            </button>
            <h2>
                { useLocation().pathname.toUpperCase().replace('/', ' ') }
            </h2>
        </div>
    )
}

export default Navbar