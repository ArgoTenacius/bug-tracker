import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, BugPage, Projects } from './components';
import routes from './constants/routes.json';

const RouteSwitch = ({user, setUser, project, setProject}) => {

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate(routes.LOGIN) : navigate(routes.PROJECT)
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Auth setUser={setUser}/>}/>
      <Route path="/project" element={<Projects user={user} setProject={setProject}/>}/>
      <Route path='/project/bugPage' element={<BugPage project={project}/>}/>
    </Routes>
  )
}

export default RouteSwitch