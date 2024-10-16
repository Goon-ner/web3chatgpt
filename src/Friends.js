import React, { useEffect, useState } from 'react'
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, where, query} from 'firebase/firestore';

export default function Friends() {
    const tg = window.Telegram.WebApp
    const users = collection(db, 'chatgpt')
    const refLink = 'https://t.me/Web3chatGPT_bot?start=' + tg.initDataUnsafe.user.id
    const [friends, setFriends] = useState([])

    const fetchFriends = async () => {
        const q = query(users, where('referral', '==', (tg.initDataUnsafe.user.id).toString()))
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // const [data, setData] = useState([])
            querySnapshot.map((doc) => {
                console.log(querySnapshot)
                setFriends([...friends, {id: doc.data().userId, name: doc.data().name}])
            })
            // setFriends(data)
        } else {
            return
        }
    }
    useEffect(() => {
        fetchFriends()
    }, [])

    return (
        <div className='friends'>
            <div className='reflink'>
                <h3>Your referral link:</h3>
                <p>{refLink}</p>
            </div>
            <div className='friends-list'>
                {friends.length ?
                friends.map((friend) => 
                <h3>{friend.name}</h3>) :
                <div>You don't have any friends yet</div>
                }
            </div>

        </div>
    )
}
