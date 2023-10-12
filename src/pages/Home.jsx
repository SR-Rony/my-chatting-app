import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import GroupList from '../components/group-list/GroupList';
import Friend from '../components/friend/Friend';
import FriendRequest from '../components/friend-request/FriendRequest';
import MyGroup from '../components/my-group/MyGroup';
import BlockedUsers from '../components/blocked-users/BlockedUsers';
import UserList from '../components/user-list/UserList';

const Home = () => {
  let navigate = useNavigate()

  let userData = useSelector(state=>state.user.value);
  useEffect(()=>{
    if(!userData){
      navigate('/login')
    }
  },[])


  return (
    <div className='h-screen'>
      <div className="grid grid-cols-3 h-1/2">
        <GroupList/>
        <Friend/>
        <UserList/>
      </div>
      <div className="grid grid-cols-3 h-1/2">
        <FriendRequest/>
        <MyGroup/>
        <BlockedUsers/>
      </div>
    </div>
  )
}

export default Home