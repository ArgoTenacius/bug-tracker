import React, {useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import routes from '../../constants/routes.json';
import './load.css'
import { useLocation, useNavigate } from 'react-router';

const Load = ({setUser, setOnLoad, projectData}) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setOnLoad(false)
        });

        if (Object.keys(projectData).length === 0){
          location === routes.BUGPAGE && navigate(routes.PROJECT)
        } 
    }, [])
    
  return (
    <main className='load'>
      <span className='loader'>

      </span>
    </main>
  )
}

export default Load