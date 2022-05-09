import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import './navbar.css'

const Navbar = () => {
  return (
    <main className='navbar'>
        <div className='navbar__up'>
            <FaUserAlt className='navbar__up-icon'/>
            
        </div>
        <div className='navbar__down'>
            <ImExit className='navbar__down-icon' />
        </div>
    </main>
  )
}

export default Navbar