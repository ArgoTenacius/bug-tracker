import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, BugPage, Projects } from './components';
import routes from './constants/routes.json';

const RouteSwitch = ({user, setUser, projectData, setProjectData}) => {

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate(routes.LOGIN) : navigate(routes.PROJECT)
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Auth setUser={setUser}/>}/>
      <Route path="/project" element={<Projects user={user} setProjectData={setProjectData}/>}/>
      <Route path='/project/bugPage' element={<BugPage project={projectData} user={user}/>}/>
    </Routes>
  )
}

export default RouteSwitch