import React from 'react';
import './newCard.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

const NewCard = () => {
  return (
    <main className='newCard'>
        <section className='newCard__section'>
            <input type="text" placeholder='bug/issue title' />
            <textarea placeholder='bug/issue description' maxLength={100}></textarea>
        </section>
        <AiOutlineArrowRight className='newCard__section-icon'/>
    </main>
  )
}

export default NewCard