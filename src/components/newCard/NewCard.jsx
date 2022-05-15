import React, { useState } from 'react';
import './newCard.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

const NewCard = ({setOpenNewCard, addNewBug, updateNewBug}) => {
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const addCard = (title, desc) => {
        const dateNow = new Date();
        const monthNow = dateNow.getMonth() + 1;
        const dayNow = dateNow.getDate();
        const yearNow = dateNow.getFullYear();
        const cardDate = `${monthNow}/${dayNow}/${yearNow}`
        
        
        addNewBug(title, cardDate, 'John Doe', desc);
        updateNewBug()
        setOpenNewCard(false);
    }

    return (
    <main className='newCard'>
        <section className='newCard__section'>
            <input type="text" placeholder='bug/issue title' onChange={(e) => setTitleInput(e.target.value)}/>
            <textarea placeholder='bug/issue description' onChange={(e) => setDescriptionInput(e.target.value)} maxLength={100} />
        </section>
        <AiOutlineArrowRight className='newCard__section-icon' onClick={() => addCard(titleInput, descriptionInput)}/>
    </main>
    )
}

export default NewCard