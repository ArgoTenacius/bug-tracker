import { arrayRemove, collection, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { HiUserRemove } from 'react-icons/hi'
import { db } from '../../firebase/config'
import './users.css'

const Users = ({project}) => {
    const [userList, setUserList] = useState([]);
    const [newUserInput, setNewUserInput] = useState("");
    const [newUserOpen, setNewUserOpen] = useState(false);

    const updateUserList = async () => {
        const docRef = doc(db, 'projects', project.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUserList(data.users);
    }
    
    const closeNewUser = () => {
        setNewUserInput("");
        setNewUserOpen(false);
    }

    useEffect(() => {
        updateUserList()
    }, [])

    const removeUser = async (user) => {
        setUserList(userList.filter(item => item !== user))

        await setDoc(doc(db, 'projects', project.id), {
            users: arrayRemove(user)
        }, { merge: true })
    }

    const addNewUser = async (user) => {
        await setDoc(doc(db, 'projects', project.id), {
            users: arrayUnion(user)
        }, {merge: true})

        closeNewUser();
        updateUserList();
    }

    const userCard = (name, key) => (
        <section key={key} className='users__card'>
            <h2>{name}</h2>
            <HiUserRemove className='users__card-icon' onClick={() => removeUser(name)}/>
        </section>
    )

    const newUserCard = () => (
        <div className='users__newCard'>
            <MdCancel className='users__newCard-icon' onClick={() => closeNewUser()}/>
            <input className='users__newCard-input' onChange={(e) => setNewUserInput(e.target.value)}/>
            <AiFillCheckCircle className='users__newCard-icon' onClick={() => addNewUser(newUserInput)}/>
        </div>
    )

  return (
    <main className='users'>
        <header className='users__header'>
            <h1>Users</h1>
            <AiOutlinePlus className='users__header-icon' onClick={() => setNewUserOpen(true)}/>
        </header>
        <hr className='users__hr'/>
        {
            newUserOpen && newUserCard()
        }
        {
            userList.map((index, id) => (
                userCard(index, id)
            ))
        }
    </main>
  )
}

export default Users