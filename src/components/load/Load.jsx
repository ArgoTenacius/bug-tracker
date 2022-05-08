import React, {useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './load.css'

const Load = ({setUser, setOnLoad}) => {

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setOnLoad(false)
        });
    }, [])
    
  return (
    <div>Load...</div>
  )
}

export default Load