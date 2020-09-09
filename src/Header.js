import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className='header'>
            <nav className='header__nav'>
                <a href='Home'>Home</a>
            </nav>
            <div className='header__logo'>Blog</div>
        </div>
    )
}

export default Header;
