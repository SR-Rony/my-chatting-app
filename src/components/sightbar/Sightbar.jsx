import React, { useState } from 'react'
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from 'react-icons/ai'
import {IoIosNotifications} from 'react-icons/io'
import { getAuth, signOut } from "firebase/auth";
import { userInfo } from '../../slices/userSlice';
import Image from '../images/Image'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paragraph from '../paragraph/Paragraph';
import List from '../list/List';
import ListItem from '../list/ListItem';

const Sightbar = () => {
  const auth = getAuth();
  // url state
  const [url,serUrl]=useState('home');

  let userData = useSelector(state=>state.user.value);

  let navigate = useNavigate()
  let dispatch =useDispatch()




  // user logout button
  const handleLogout = () =>{
    signOut(auth)
    .then(()=>{
      dispatch(userInfo(null));
      localStorage.removeItem('user');
      navigate('/login')
    })
  }
  return (
    <div className=' w-3/4 h-screen box-border my-5 rounded-md bg-primary mx-auto py-5 grid justify-center'>
        <div className='text-3xl cursor-pointer text-center'>
          <Image className='w-20 h-20 rounded-full mx-auto mb-5' src={userData.photoURL}/>
          <Paragraph text={userData.displayName}/>
          <List>
              <ListItem className={url=='home'&& 'bg-black text-primary px-5 rounded-md'} text={<Link to='/home'>{<AiFillHome onClick={()=>serUrl('home')} className='my-12 mx-auto'/>}</Link>}/>
              <ListItem className={url=='message'&& 'bg-black text-primary px-5 rounded-md'} text={<Link to='/message'>{<AiFillMessage onClick={()=>serUrl('message')} className='my-12 mx-auto'/>}</Link>}/>
              <ListItem className={url=='notification'&& 'bg-black text-primary px-5 rounded-md'} text={<Link to='/notification'>{<IoIosNotifications onClick={()=>serUrl('notification')} className='my-12 mx-auto'/>}</Link>}/>
              <ListItem className={url=='setting'&& 'bg-black text-primary px-5 rounded-md'} text={<Link to='/setting'>{<AiFillSetting onClick={()=>serUrl('setting')} className='my-12 mx-auto'/>}</Link>}/>
          </List>
        </div>
        <AiOutlineLogout onClick={handleLogout} className='mx-auto text-3xl cursor-pointer'/>
    </div>
  )
}

export default Sightbar