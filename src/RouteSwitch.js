import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, BugPage } from './components'

const RouteSwitch = ({user, setUser}) => {

  const navigate = useNavigate();

  useEffect(() => {
    !user === null ? navigate('/home') : navigate('/login')
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Auth setUser={setUser}/>}/>
      <Route path="/home" element={<BugPage />}/>
    </Routes>
  )
}

export default RouteSwitch