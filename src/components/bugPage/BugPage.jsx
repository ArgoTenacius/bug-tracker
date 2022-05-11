import React from 'react'
import './bugPage.css'
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const BugPage = ({project}) => {
  console.log(project);
  return (
    <main className='bugPage'>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>New</h1>
          <AiOutlinePlus className='bugPage__section-header--icon'/>
        </header>
        <div className='bugPage__section-card'>
            <h1>Title</h1>
            <div className='bugPage__section-card--date'>
              <h6>posted: 06/12/2004</h6>
            </div>
            <div className='bugPage__section-card--user'>
              <h5>By: username</h5>
            </div>
          <p>
            It dont work f
          </p>
          <div className='bugPage__section-card--arrow right'>
            <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
          </div>
        </div>
      </section>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Wip</h1>
        </header>
        <div className='bugPage__section-card'>
          <header>
              <h1>Title</h1>
              <h6>06/12/2004</h6>
            </header>
            <h4>By: username</h4>
            <p>
              It dont work f
            </p>
            <div className='bugPage__section-card--arrow'>
              <AiOutlineArrowLeft className='bugPage__section-card--arrow---icon'/>
              <AiOutlineArrowRight className='bugPage__section-card--arrow---icon'/>
            </div>
        </div>
      </section>
      <section className='bugPage__section'>
        <header className='bugPage__section-header'>
          <h1>Done</h1>
        </header>
        <div className='bugPage__section-card'>
          <header>
            <h1>Title</h1>
            <h6>06/12/2004</h6>
          </header>
          <h4>By: username</h4>
          <p>
            It dont work f
          </p>
          <div className='bugPage__section-card--arrow'>
            <AiOutlineArrowLeft className='bugPage__section-card--arrow---icon'/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BugPage