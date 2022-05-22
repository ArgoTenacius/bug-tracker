import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { ImExit, ImHome } from 'react-icons/im'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import routes from '../../constants/routes.json'
import './navbar.css'
import { useNavigate } from 'react-router'

const Navbar = ({isInProject, setIsInProject}) => {
  const navigate = useNavigate();
  const upSideIcons = () => (
    <>
      <ImHome className='navbar__down-icon' onClick={goHome}/>
      <FaUserAlt className='navbar__up-icon'/>
    </>
  )

  const logout = async () => {
      await signOut(auth);
      navigate(routes.LOGIN);
    };
  
  const goHome = () => {
    setIsInProject(false);
    navigate(routes.PROJECT);
  }
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