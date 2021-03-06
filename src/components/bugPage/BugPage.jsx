import React, { useEffect, useState } from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiFillCheckCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { arrayRemove, arrayUnion, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config' 
import { getDateNow } from '../../util/getDateNow'

const BugPage = ({project, user}) => {
  const [openBugs, setOpenBugs] = useState([]);
  const [inProgressBugs, setInProgressBugs] = useState([]);
  const [doneBugs, setDoneBugs] = useState([]);
  const [newBugOpen, setNewBugOpen] = useState(false);
  const [newBugInput, setNewBugInput] = useState("");

  const closeNewBug = () => {
    setNewBugInput("");
    setNewBugOpen(false);
  }

  const updateBugList = async () => {
    const docRef = doc(db, 'projects', project.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    
    setOpenBugs(data.bugs.open);
    setInProgressBugs(data.bugs.inProgress);
    setDoneBugs(data.bugs.done);
  }

  useEffect(() => {
    updateBugList()
  }, [])

  //create a new bug from scratch
  const addNewBug = async (issue) => {
    setNewBugOpen(false);
    const cardDate = getDateNow();

    const newBug = {
      posted: user.email,
      issue: issue,
      date: cardDate
    }

    setOpenBugs(oldArray => [...oldArray, newBug]);
    await setDoc(doc(db, 'projects', project.id),{
      bugs: {
        open: arrayUnion(newBug)
      }
    }, {merge: true});
  }

  //move an existent bug to a list (open, inProgress, Done) in a data 
  const addBugToData = async (list, bug) => {
    const cardDate = getDateNow();
    
    const newBug = {
      posted: bug.posted,
      issue: bug.issue,
      date: cardDate
    }

    if(list === "inProgress") {
      await setDoc(doc(db, 'projects', project.id),{
        bugs: {
          inProgress: arrayUnion(newBug)
        }
      }, {merge: true});

      await setDoc(doc(db, 'projects', project.id), {
        bugs: {
          open: arrayRemove(bug)
        }
      }, {merge: true})
    }
    else if(list === "open") {
      await setDoc(doc(db, 'projects', project.id),{
        bugs: {
          open: arrayUnion(newBug)
        }
      }, {merge: true});

      await setDoc(doc(db, 'projects', project.id), {
        bugs: {
          inProgress: arrayRemove(bug)
        }
      }, {merge: true})
    }else if(list === "done"){
      await setDoc(doc(db, 'projects', project.id), {
        bugs: {
          done: arrayUnion(newBug)
        }
      }, {merge: true})

      await setDoc(doc(db, 'projects', project.id), {
        bugs: {
          inProgress: arrayRemove(bug)
        }
      }, {merge: true})
    }else{
      await setDoc(doc(db, 'projects', project.id),{
        bugs: {
          inProgress: arrayUnion(newBug)
        }
      }, {merge: true});

      await setDoc(doc(db, 'projects', project.id), {
        bugs: {
          done: arrayRemove(bug)
        }
      }, {merge: true})
    }
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

  const changeList = async (bug, oldList, list, type) => {
    //get the bug and send to the "list" and remove the bug fron the previous list
    oldList.setList(oldList.list.filter(item => item !== bug))

    list(oldArray => [...oldArray, bug] );
    
    //type: open, inProgress or done
    addBugToData(type, bug)
  }

  return (
    <main className='bugPage'>
      <section className='bugPage__category'>
        <header className='bugPage__category-header'>
          <h1>Open</h1>
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
              <div className='bugPage__category-card--arrows right'>
                <AiOutlineArrowRight className='bugPage__category-card--arrows---icon' onClick={() => 
                  changeList(index, {list: openBugs, setList: setOpenBugs}, setInProgressBugs, 'inProgress')}
                />
              </div>
            </div>
          ))
        }
      </section>

      <section className='bugPage__category'>
        <header className='bugPage__category-header'>
          <h1>In progress</h1>
        </header>
        {
          inProgressBugs.map((index, id) => (
            <div key={id} className='bugPage__category-card'>
              <header className='bugPage__category-card--header'>
                <h1>{index.issue}</h1>
                <h6>{index.date}</h6>
              </header>
              <h4>By: {index.posted}</h4>
              <div className='bugPage__category-card--arrows'>
                <AiOutlineArrowLeft className='bugPage__category-card--arrows---icon' onClick={() => 
                  changeList(index, {list: inProgressBugs, setList: setInProgressBugs}, setOpenBugs, 'open')}
                />
                <AiOutlineArrowRight className='bugPage__category-card--arrows---icon' onClick={() => 
                  changeList(index, {list: inProgressBugs, setList: setInProgressBugs}, setDoneBugs, 'done')}
                />
              </div>
            </div>
          ))
        }
      </section>

      <section className='bugPage__category'>
        <header className='bugPage__category-header'>
          <h1>Done</h1>
        </header>
        {
          doneBugs.map((index, id) => (
            <div key={id} className='bugPage__category-card'>
              <header className='bugPage__category-card--header'>
                <h1>{index.issue}</h1>
                <h6>{index.date}</h6>
              </header>
              <h4>By: {index.posted}</h4>
              <div className='bugPage__category-card--arrows left'>
                <AiOutlineArrowLeft className='bugPage__category-card--arrows---icon' onClick={() => 
                  changeList(index, {list: doneBugs, setList: setDoneBugs}, setInProgressBugs, 'inProgressFromDone')}
                />
              </div>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default BugPage