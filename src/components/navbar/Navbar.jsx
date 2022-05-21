import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import './navbar.css'
import { useNavigate } from 'react-router'

const Navbar = ({isInProject}) => {
  const navigate = useNavigate();
  const upSideIcons = () => (
    <FaUserAlt className='navbar__up-icon'/>
  )

  const logout = async () => {
      await signOut(auth);
      navigate('/login');
    };
  return (
    <main className='navbar'>
        <div className='navbar__up'>
            {
              isInProject && upSideIcons()
            }
        </div>
        <div className='navbar__down'>
            
            <ImExit className='navbar__down-icon' onClick={logout}/>
        </div>
    </main>
  )
}

export default Navbar