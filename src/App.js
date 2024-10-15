import './App.css'
import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, where, query} from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import HomeIcon from './icons/home.png'
import FriendsIcon from './icons/friends.png'
import TasksIcon from './icons/tasks.png'





function App() {
  const tg = window.Telegram.WebApp

  const users = collection(db, 'chatgpt');
  const [points, setPoints] = useState()
  const [docId, setDocId] = useState()
  const [started, setStarted] = useState(false)
  const [timeStart, setTimeStart] = useState()
  const [counter, setCounter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchPoints = async () => {
    const q = query(users, where('userId', '==', tg.initDataUnsafe.user.id))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setDocId(doc.id)
        // eslint-disable-next-line no-unused-expressions
        setPoints(doc.data().points),
        setTimeStart(doc.data().started)
        setCounter(14400000 - (new Date().getTime() - doc.data().started))
      })
    } else {
      await addDoc(users, {
        userId: tg.initDataUnsafe.user.id, 
        name:tg.initDataUnsafe.user.first_name, 
        lastname:tg.initDataUnsafe.user.last_name, 
        points: 5000, 
        started: 0, 
        used_tokens: 0,
        referral: ''
      })
      await fetchPoints()
    }
  }
  useEffect(() => {
    fetchPoints()
    setIsLoading(false)
  }, [])
  useEffect(() => {
    timeout()
  }, [counter])

  const handleCatchPoints = async () => {
    try {
      const time = new Date().getTime()
      const update = doc(users, docId)
      const data = {points: points+1000, started: time}
      await updateDoc(update, data);
      setStarted('started')
      setTimeStart(time)
      setCounter(14400000)
      await fetchPoints()
    } catch (error) {
      console.error("Error adding action point: ", error);
    }
  }
  const handleStartFarming = async () => {
    try {
      const time = new Date().getTime()
      const update = doc(users, docId)
      const data = {started: time}
      await updateDoc(update, data);
      setStarted('started')
      setTimeStart(time)
      setCounter(14400000)
      await fetchPoints()
    } catch (error) {
      console.error(error)
    }
  }

  const timeout = () => {
    const targetTime = timeStart + 14400000
    setCounter(14400000 - (new Date().getTime() - timeStart))
    if (!timeStart) {
      setStarted('notstarted')
    } else if (targetTime <= new Date().getTime()) {
      setStarted('stopped')
    } else setStarted('started')
  } 
  const convertTime = (time) => {
    const hour = Math.floor(time/3600000)
    const min = Math.floor((time - hour*3600000)/60000)
    return hour+' Hours '+min+' Minutes'
  }

  return (
    isLoading? 
      <div className='App'>
        <div className='space'></div>
        <div className='loading'>
          <h2>Web3 chatGPT</h2>
          <Spinner animation="grow" />;
        </div>
      </div>
      : 
      <div className="App">
        <div className='main'>
          {tg.initDataUnsafe.user.first_name?
            <h2 className='tgName'>
          {/* {tg.initDataUnsafe.user.first_name}  */}
          {tg.initDataUnsafe.user.last_name}
          </h2> :
          <h2>Username</h2>}
          <div className='balance'>
            <h2>Your balance:</h2>
            <h2 >{points} tokens</h2>
          </div>
          { started !== 'started' ?
          <button onClick={
            started === 'stopped' ? handleCatchPoints : handleStartFarming} 
            className='farming'>
            {started === 'stopped' ? 'Claim 1000 tokens' : 'Start farming'}
            </button> 
          :
          <button 
          disabled={true}
          className='farming'>
          {convertTime(counter)}
          </button>
          }
        </div>
        <div className='space'></div>
        <div className='footer'>
          <a className='footer-icons'>
            <img src={HomeIcon} alt='home icon' className='icon'/>
            <div>Home</div>
          </a>
          <a className='footer-icons'>
            <img src={FriendsIcon} alt='friends icon' className='icon'/>
            <div>Friends</div>
          </a>
          <a className='footer-icons'>
            <img src={TasksIcon} alt='tasks icon' className='icon'/>
            <div>Tasks</div>
          </a>
        </div>
      </div>
  );
}

export default App;
