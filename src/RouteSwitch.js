import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, Projects } from './components'

const RouteSwitch = ({user, setUser}) => {

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate('/login') : navigate('/home')
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Auth setUser={setUser}/>}/>
      <Route path="/home" element={<Projects />}/>
    </Routes>
  )
}

export default RouteSwitch