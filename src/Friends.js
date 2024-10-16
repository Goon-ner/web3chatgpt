import React, { useEffect, useState } from 'react'
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, where, query} from 'firebase/firestore';

export default function Friends() {
    const tg = window.Telegram.WebApp
    const users = collection(db, 'chatgpt')
    const refLink = 'https://t.me/Web3chatGPT_bot?start=' + tg.initDataUnsafe.user.id
    const [friends, setFriends] = useState([])
    const [docId, setDocId] = useState()
    const [points, setPoints] = useState()

    const fetchFriends = async () => {
        const q = query(users, where('referral', '==', (tg.initDataUnsafe.user.id).toString()))
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const data = []
            querySnapshot.docs.map((doc) => {
                data.push({id: doc.id, name: doc.data().name, refClaimed: doc.data().refClaimed})
            })
            setFriends(data)
        } else {
            return
        }
    }
    const fetchDoc = async () => {
        const q = query(users, where('userId', '==', tg.initDataUnsafe.user.id))
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.docs.map((doc) => {
                setDocId(doc.id)
                setPoints(doc.data().points)
            })
        } else {
            return
        }
    }

    useEffect(() => {
        fetchFriends()
        fetchDoc()
    }, [])

    const copyRefLink = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          console.error('Ошибка:', err);
        }
    }

    const handleCatchRefPoints = async (refid) => {
        try {
            const update = doc(users, docId)
            const data = {points: points+1000}
            const updateRef = doc(users, refid)
            const dataRef = {refClaimed: true}
            console.log(refid)
            await updateDoc(update, data)
            await updateDoc(updateRef, dataRef)
            await fetchFriends()
            } catch (error) {
            console.error("Error adding action point: ", error);
        }
      }

    return (
        <div className='friends'>
            <div className='reflink'>
                <h3>Your referral link:</h3>
                <div className='link'>
                    <div>{refLink.slice(8,28)}</div>
                    <div className='copyRefLink' onClick={() => copyRefLink(refLink)}>Copy</div>
                </div>
            </div>
            {friends ?
            <div className='friends-list'>
                <h3>{friends.length} Friends:</h3>
                {friends.map((friend) =>
                <div className='friend'>
                    <h3>{friend.fname}</h3>
                    {friend.refClaimed ?
                    <div className='claimed-ref'>Claimed</div> :
                    <div onClick={() => handleCatchRefPoints(friend.id)} className='claim-ref'>Claim 1000</div>
                    }
                </div>)}
            </div>:
             <div>You don't have any friends yet</div>
            }

        </div>
    )
}
