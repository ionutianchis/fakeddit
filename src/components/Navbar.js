import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {

    return (
        <nav>
            <div className='logo-container'>
                <button type='button' className='logo-button'/>
                <p>fakeddit</p>
            </div>
            
            <form className='nav-form'>
                <img src={require('../images/search.png').default} alt={'search'}/>
                <input className='nav-search' placeholder='Fake search Fakeddit'></input>
            </form>
        
            <div className='nav-buttons'>
                <button type='button' className='nav-log-in'>Log in</button>
                <button type='button' className='nav-sign-in'>Sign in</button>
                <button type='button' className='nav-user-icon' />
            </div>
        </nav>
    )
}

export default Navbar