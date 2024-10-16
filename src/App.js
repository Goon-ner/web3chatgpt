import './App.css'
import Spinner from 'react-bootstrap/Spinner';
import HomeIcon from './icons/home.png'
import FriendsIcon from './icons/friends.png'
import TasksIcon from './icons/tasks.png'
import {NavLink, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Friends from './Friends'
import Tasks from './Tasks'


function App() {

  return (
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/friends" element={<Friends />}/>
        <Route path="/tasks" element={<Tasks />}/>
      </Routes>
      <div className='footer'>
          <NavLink to='/' className='footer-icons'>
            <img src={HomeIcon} alt='home icon' className='icon'/>
            <div>Home</div>
          </NavLink>
          <NavLink to='/friends' className='footer-icons'>
            <img src={FriendsIcon} alt='friends icon' className='icon'/>
            <div>Friends</div>
          </NavLink>
          <NavLink to='/tasks' className='footer-icons'>
            <img src={TasksIcon} alt='tasks icon' className='icon'/>
            <div>Tasks</div>
          </NavLink>
        </div>
      </div>
  );
}

export default App;
