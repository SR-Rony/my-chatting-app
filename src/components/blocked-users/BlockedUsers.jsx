import React from 'react'
import Hadding from '../hadding/Hadding'
import Image from '../images/Image'
import Button from '../button/Button'
import userIng from '../../assets/user.png'
import Paragraph from '../paragraph/Paragraph'

const BlockedUsers = () => {
  return (
    <div className='col-span-1 border border-black overflow-y-scroll rounded-md p-5 bg-gray-700 text-white my-5 mx-3'>
          <Hadding className='text-center mb-3' text='Blocked users'/>
          <div className='flex items-center justify-between my-3 border-b border-white pb-2'>
            <Image className='w-10 h-10' src={userIng}/>
            <Paragraph className='text-xl' text='user name'/>
            <Button className='px-7' text='add'/>
          </div>
          <div className='flex items-center justify-between my-3 border-b border-white pb-2'>
            <Image className='w-10 h-10' src={userIng}/>
            <Paragraph className='text-xl' text='user name'/>
            <Button className='px-7' text='add'/>
          </div>
          <div className='flex items-center justify-between my-3 border-b border-white pb-2'>
            <Image className='w-10 h-10' src={userIng}/>
            <Paragraph className='text-xl' text='user name'/>
            <Button className='px-7' text='add'/>
          </div>
          <div className='flex items-center justify-between my-3'>
            <Image className='w-10 h-10' src={userIng}/>
            <Paragraph className='text-xl' text='user name'/>
            <Button className='px-7' text='add'/>
          </div>
    </div>
  )
}

export default BlockedUsers