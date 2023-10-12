import React, { useEffect, useState } from 'react'
import Hadding from '../hadding/Hadding'
import Image from '../images/Image'
import Button from '../button/Button'
import Paragraph from '../paragraph/Paragraph'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux'

const UserList = () => {
  const db = getDatabase();
  // userLise array
  const [userList,setUserList]=useState([])
  // login user info
  let userData = useSelector(state=>state.user.value)

  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let array =[]
      snapshot.forEach((item)=>{
        if(item.key!=userData.uid){
          array.push({...item.val(),"userId":item.key})
        }
        setUserList(array)
      })
    });
  },[])

  // user friend request button
  const handleFriendRequest =()=>{
    console.log('friend request');
  }



  return (
    <div className='col-span-1 border border-black overflow-y-scroll rounded-md p-5 bg-gray-700 text-white my-5 mx-3'>
          <Hadding className='text-center mb-3' text='User list'/>
          {userList.map((item,index)=>(
              <div key={index} className='flex items-center justify-between my-3 border-b border-white pb-2'>
                <Image className='w-10 h-10' src={item.photoURL}/>
                <Paragraph className='text-xl' text={item.userName}/>
                <Button onClick={handleFriendRequest} className='px-7' text='+'/>
              </div>
          ))}
    </div>
  )
}

export default UserList