import React from 'react';
import aroundtheus from '../images/Vectorlogo.svg';


function Header({loggedIn,handleSignOut, path}){

    function handleText(loggedIn){
        if(loggedIn){
           return( 'Log out')
        } 
        else if (!loggedIn && path === 'signin'){
            return 'Sign up'
        } 
        else {
            return 'Log in'
        }
    }

    return(
        <header className="header">
            <img src={aroundtheus} alt="Logo" className="header__logo" />
            <div className="header__login-container">
                <p style={{ color: 'white' }}> {} </p>
                <button onClick={handleSignOut} className='header__button'>
                    {
                        handleText(loggedIn)
                    }
                </button>
            </div>   
        </header>
    )
}

export default Header;