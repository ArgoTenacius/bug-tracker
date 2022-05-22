import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, BugPage, Projects, Users } from './components';
import routes from './constants/routes.json';

const RouteSwitch = ({user, setUser, projectData, setProjectData, setIsInProject}) => {

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate(routes.LOGIN) : navigate(routes.PROJECT)
  }, []);

  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Auth setUser={setUser}/>}/>
      <Route path={routes.PROJECT} element={<Projects user={user} setProjectData={setProjectData} setIsInProject={setIsInProject}/>}/>
      <Route path={routes.BUGPAGE} element={<BugPage project={projectData} user={user}/>}/>
      <Route path={routes.USERS} element={<Users project={projectData}/>}/>
    </Routes>
  )
}

export default RouteSwitch