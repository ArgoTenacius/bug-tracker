import React from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const BugPage = ({project}) => {
  const newBugs = project.Project.bugs.new.bugs;
  //const wipBugs = project.Project.bugs.wip.bugs;
  //const doneBugs = project.Project.bugs.done.bugs;
  const cardNew = (title, data, user, desc = '', id) => (
    <div key={id} className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {data}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow right'>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  const cardWip = (title, data, dataTaken, user, userTaken, desc = '') => (
    <div className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {data}</h6>
        <h6>taken: {dataTaken}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
        <h5>Taken by: {userTaken}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow'>
        <AiOutlineArrowLeft className='bugPage__section-card--arrow---icon'/>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  const cardDone = (title, data, dataTaken, dataFinish, user, userTaken, desc = '') => (
    <div className='bugPage__section-card'>
      <h1>{title}</h1>
      <div className='bugPage__section-card--date'>
        <h6>posted: {data}</h6>
        <h6>taken: {dataTaken}</h6>
        <h6>finished: {dataFinish}</h6>
      </div>
      <div className='bugPage__section-card--user'>
        <h5>By: {user}</h5>
        <h5>Taken by: {userTaken}</h5>
      </div>
      <p>
        {desc}
      </p>
      <div className='bugPage__section-card--arrow'>
        <AiOutlineArrowLeft className='bugPage__section-card--arrow---icon'/>
        <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
      </div>
    </div>
  )

  return (
    <main className='bugPage'>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>New</h1>
          <AiOutlinePlus className='bugPage__section-header--icon'/>
        </header>
        {
          newBugs.map((index, id) => (
              cardNew(index.title, index.posted, index.email, index.description, id)
            )
          )
        }
      </section>

      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Wip</h1>
        </header>
        {
          cardWip('mouse issue', '06/08/2004', '08/08/2004', 'johndoe@gmail.com', 'janedoe@gmail.com', 'it dont work')
        }
      </section>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Done</h1>
        </header>
        {
          cardDone('mouse issue', '06/08/2004', '08/08/2004', '09/08/2004', 'johndoe@gmail.com', 'janedoe@gmail.com', 'it dont work')
        }
      </section>
    </main>
  )
}

export default BugPage