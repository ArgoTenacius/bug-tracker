import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router';
import { ImExit } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import routes from '../../constants/routes.json'
import './projects.css';

const Projects = ({user, setProjectData}) => {
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const appProjects = collection(db, "projects"); 

  const renderProjects = async () => {
    //get the data from firebase
    const dataProjects = await getDocs(appProjects);
    const projects = dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id}));

    setProject(projects);
  }

  const enterProject = (data) => {
    setProjectData(data);
    navigate(routes.BUGPAGE);
  }

  useEffect(() => {
    renderProjects();
  }, [])

  const projectCard = (name, key, project) => (
    <section key={key} className='project__card'>
        <h1 className='project__card-name' onClick={() => enterProject(project)}>{name}</h1>
        <ImExit className='project__card-icon'/>
    </section>
  )

  return (
    <main className='project'>
        <header className='project__header'>
            <h1>Your projects</h1>
            <AiOutlinePlus className='project__header-icon'/>
        </header>
        <hr />
        {
            project.map((index) => (
                index.Project.users.includes(user.email) === true && projectCard(index.Project.name, index.id, index)
            ))
        }
    </main>
  )
}

export default Projects;