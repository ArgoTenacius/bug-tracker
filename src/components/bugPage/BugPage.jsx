import React, { useEffect, useState } from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { arrayUnion, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config' 

const BugPage = ({project, user}) => {
  const [openBugs, setOpenBugs] = useState(project.bugs.open);
  const [newBugOpen, setNewBugOpen] = useState(false);
  const [newBugInput, setNewBugInput] = useState("");
  const projectRef = collection(db, "projects");

  const closeNewBug = () => {
    setNewBugInput("");
    setNewBugOpen(false);
  }

  const addNewBug = async (issue) => {
    setNewBugOpen(false);
    const dateNow = new Date();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();
    const yearNow = dateNow.getFullYear();
    const cardDate = `${monthNow}/${dayNow}/${yearNow}`

    const openBug = {
      posted: user.email,
      issue: issue,
      date: cardDate
    }

    setOpenBugs(oldArray => [...oldArray, openBug]);
    await setDoc(doc(db, 'projects', project.id),{
      bugs: {
        open: arrayUnion(openBug)
      }
    }, {merge: true});
  }

  const newBugCard = () => (
    <div className='bugPage__category-card big'>
      <MdCancel className='bugPage__category-card--icon' onClick={() => closeNewBug()}/>
      <input className='bugPage__category-card--input' onChange={(e) => setNewBugInput(e.target.value)}/>
      <AiFillCheckCircle className='bugPage__category-card--icon' onClick={() => 
        newBugInput.trim().length > 0 ? addNewBug(newBugInput) : console.log('Input empty!')
      }/>
    </div>
  )

  useEffect(() => {
    console.log(openBugs)
  }, []);

  return (
    <main className='bugPage'>
      <section className='bugPage__category'>
        <header className='bugPage__category-header'>
          <h1>In progress</h1>
          <AiOutlinePlus className='bugPage__category-header--icon' onClick={() => setNewBugOpen(true)}/>
        </header>

        {
          newBugOpen && newBugCard()
        }

        {
          openBugs.map((index, id) => (
            <div key={id} className='bugPage__category-card'>
              <header className='bugPage__category-card--header'>
                <h1>{index.issue}</h1>
                <h6>{index.date}</h6>
              </header>
              <h4>By: {index.posted}</h4>
            </div>
          ))
        }

      </section>
    </main>
  )
}

export default BugPage