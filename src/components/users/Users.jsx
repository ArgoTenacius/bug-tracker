import { arrayRemove, collection, doc, setDoc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiUserRemove } from 'react-icons/hi'
import { db } from '../../firebase/config'
import './users.css'

const Users = ({project}) => {
    const [userList, setUserList] = useState([]);

    const updateUserList = async () => {
        const docRef = doc(db, 'projects', project.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        
        setUserList(data.users)
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

    const userCard = (name, key) => (
        <section key={key} className='users__card'>
            <h2>{name}</h2>
            <HiUserRemove className='users__card-icon' onClick={() => removeUser(name)}/>
        </section>
    )

  return (
    <main className='users'>
        <header className='users__header'>
            <h1>Users</h1>
            <AiOutlinePlus className='users__header-icon'/>
        </header>
        <hr className='users__hr'/>
        {
            userList.map((index, id) => (
                userCard(index, id)
            ))
        }
    </main>
  )
}

export default Users