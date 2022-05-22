import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { addDoc, arrayUnion, collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router';
import { ImExit } from 'react-icons/im'
import { AiOutlinePlus, AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import routes from '../../constants/routes.json'
import './projects.css';

const Projects = ({user, setProjectData, setIsInProject}) => {
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectInput, setNewProjectInput] = useState("");
  const appProjects = collection(db, "projects"); 

  const renderProjects = async () => {
    //get the data from firebase
    const dataProjects = await getDocs(appProjects);
    const projects = dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id}));

    setProject(projects);
  }

  const enterProject = (data) => {
    setIsInProject(true);
    setProjectData(data);
    navigate(routes.BUGPAGE);
  }

  const closeNewProject = () => {
    setNewProjectInput("");
    setNewProjectOpen(false);
  }

  const createNewProject = async (name) => {
    await addDoc(appProjects, {
      name: name,
      users: arrayUnion(user.email),
      bugs: {
        open: [],
        inProgress: [],
        done: []
      }
    })

    closeNewProject();
    renderProjects();
  }

  const newProjectCard = () => (
    <div className='project__newCard'>
      <MdCancel className='project__newCard-icon' onClick={() => closeNewProject()}/>
      <input maxLength={30} className='project__newCard-input' onChange={(e) => setNewProjectInput(e.target.value)}/>
      <AiFillCheckCircle className='project__newCard-icon' onClick={() => createNewProject(newProjectInput) }/>
    </div>
  )

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
            <AiOutlinePlus className='project__header-icon' onClick={() => setNewProjectOpen(true)}/>
        </header>
        <hr />
        { newProjectOpen && newProjectCard() }
        {
            project.map((index) => (
                index.users.includes(user.email) === true && projectCard(index.name, index.id, index)
            ))
        }
    </main>
  )
}

export default Projects;