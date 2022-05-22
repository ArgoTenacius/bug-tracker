import React, { useState } from 'react'
import { ImExit, ImUsers } from 'react-icons/im'
import { AiOutlineUnorderedList, AiFillBug } from 'react-icons/ai'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import routes from '../../constants/routes.json'
import './navbar.css'
import { useNavigate } from 'react-router'

const Navbar = ({isInProject, setIsInProject}) => {
  const navigate = useNavigate();
  const upSideIcons = () => (
    <>
      <AiOutlineUnorderedList className='navbar__down-icon' onClick={goHome}/>
      <AiFillBug className='navbar__up-icon' onClick={() => navigate(routes.BUGPAGE)} />
      <ImUsers className='navbar__up-icon' onClick={() => navigate(routes.USERS)}/>
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