import React, { useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, doc, getDocs } from 'firebase/firestore'
import { ImExit } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import './projects.css';

const Projects = () => {
  const appProjects = collection(db, "projects"); 

  const getProjects = async () => {
      const dataProjects = await getDocs(appProjects)
      console.log(dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <main className='project'>
        <header className='project__header'>
            <h1>Your projects</h1>
            <AiOutlinePlus className='project__header-icon'/>
        </header>
        <hr />
        <section className='project__card'>
            <h1 className='project__card-name'>John Doe Project</h1>
            <ImExit className='project__card-icon'/>
        </section>
    </main>
  )
}

export default Projects