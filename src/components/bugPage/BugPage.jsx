import React, { useEffect, useState } from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import NewCard from '../newCard/NewCard';
import { addDoc, collection, getDocs, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';

const BugPage = ({project, user}) => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const [newBugs, setNewBugs] = useState(project.bugs.new);
  const [wipBugs, setWipBugs] = useState(project.bugs.wip);
  const projectRef = collection(db, "projects"); 

  const newToWip = (title, date, postedBy, desc) => {
    const dateNow = new Date();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();
    const yearNow = dateNow.getFullYear();
    const cardDate = `${monthNow}/${dayNow}/${yearNow}`;

    addNewWip(title, date, cardDate, postedBy, user.email, desc);
    updateBugList();
  }

  const newBug = (title, date, user, desc, id) => (
    <div key={id} className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {date}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow right'>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon' onClick={() => newToWip(title, date, user, desc)}/>
      </div>
    </div>
  )

  const newWip = (title, date, dateTake, user, userTake, desc, id) => (
    <div key={id} className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {date}</h6>
        <h6>taken: {dateTake}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
        <h5>Taken by: {userTake}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow right'>
        <AiOutlineArrowLeft className='bugPage__section-card--arrow---icon' />
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  const updateBugList = async () => {
    //get the data from firebase
    const dataProjects = await getDocs(projectRef);
    const projects = dataProjects.docs.map((doc) => ({...doc.data(), id: doc.id}));

    setNewBugs(projects[0].bugs.new);
    setWipBugs(projects[0].bugs.wip);
  }

  const addNewBug = async (title, date, user, desc) => {
    await setDoc(doc(db, 'projects', project.id), {
      bugs: {
        new: arrayUnion({
            title: title,
            description: desc,
            postDate: date,
            user: user
        })
      }
    }, {merge: true})
  }

  const addNewWip = async (title, date, dateTake, user, userTake, desc) => {
    console.log(userTake);
    console.log(desc);
    await setDoc(doc(db, 'projects', project.id), {
      bugs: {
        wip: arrayUnion({
            title: title,
            postDate: date,
            takenDate: dateTake,
            user: user,
            description: desc
        })
      }
    }, {merge: true})
  }

  return(
  <main className='bugPage'>
      {
        openNewCard && <NewCard setOpenNewCard={setOpenNewCard} addNewBug={addNewBug} updateBugList={updateBugList} user={user}/>
      }

      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>New</h1>
          <AiOutlinePlus className='bugPage__section-header--icon' onClick={() => setOpenNewCard(true)}/>
        </header>
        {
          newBugs.map((index, id) => (
            newBug(index.title, index.postDate, index.user, index.description, id)
          ))
        }
      </section>
  
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Wip</h1>
        </header>
        {
          wipBugs.map((index, id) => (
            newWip(index.title, index.postDate, index.dateTaken, index.user, index.userTake, index.description, id)
          ))
        }
      </section>
  </main>
  )
}
export default BugPage