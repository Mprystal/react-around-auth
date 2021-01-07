import React from 'react';
import aroundtheus from '../images/Vectorlogo.svg';

function Header(){
    return(
        <header className="header">
            <img src={aroundtheus} alt="Logo" className="header__logo" />
        </header>
    )
}

export default Header;