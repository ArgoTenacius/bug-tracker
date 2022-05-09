import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { ImExit } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import './projects.css';

const Projects = ({user}) => {
  const [project, setProject] = useState([]);
  const appProjects = collection(db, "projects"); 

  const renderProjects = async () => {
    //get the data from firebase
    const dataProjects = await getDocs(appProjects);
    const projects = dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id}));

    setProject(projects);
  }

  useEffect(() => {
    renderProjects();
  }, [])

  const projectCard = (name, key) => (
    <section key={key} className='project__card'>
        <h1 className='project__card-name'>{name}</h1>
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
                projectCard(index.Project.name, index.id)
            ))
        }
    </main>
  )
}

export default Projects;