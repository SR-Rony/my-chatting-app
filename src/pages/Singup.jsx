import React, { useEffect, useState } from 'react'
import Hadding from '../components/hadding/Hadding'
import Paragraph from '../components/paragraph/Paragraph';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile   } from "firebase/auth";//firebase authentication
import { useNavigate } from 'react-router-dom';
import { Vortex } from  'react-loader-spinner';
import {toast } from 'react-toastify';
import { getDatabase, ref, set } from "firebase/database";


const Singup = () => {
    // user authcation
    const auth = getAuth();
    // firebase database
    const db = getDatabase();
    // all input value state
    const [inputValue,setInputValue]=useState({name:'',email:'',password:''});
    let {name,email,password}=inputValue;
    // all error state
    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    // loding state
    const [loding,setLoding]=useState(false)
    // navigate
    let navigate=useNavigate()
    // handle input change
    const handleChange = (e) =>{
        setInputValue({...inputValue,[e.target.name]:e.target.value})
        if(e.target.name=='name'){
            setNameError('')
        }
        if(e.target.name=='email'){
            setEmailError('')
        }
        if(e.target.name=='password'){
            setPasswordError('')
        }
    }
    // handle form submit
    const handleSubmit = (e) =>{

        if(!name){
            setNameError('please inter your name')
        }
        if(!email){
            setEmailError('please inter your email')
        }
        if(!password){
            setPasswordError('please inter your password')
        }
        if(name && email && password){
            setLoding(true)
            // create new user
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    // user profile update
                    updateProfile(auth.currentUser, {
                        displayName: name, 
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/chatting-app-abc63.appspot.com/o/user.png?alt=media&token=338dfc90-7dd6-435e-80f6-2fe3cdf10f19"
                      }).then(() => {
                        setLoding(false)
                        // email verification
                        sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // email varify toast message
                            toast.warn(' please your email varify !', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            // firebase database new user set
                            set(ref(db, 'users/' + user.user.uid), {
                                userName: name,
                                email: email,
                                photoURL: "https://firebasestorage.googleapis.com/v0/b/chatting-app-abc63.appspot.com/o/user.png?alt=media&token=338dfc90-7dd6-435e-80f6-2fe3cdf10f19",
                            });
                        });
                      })
                    // navigate login pages
                    setTimeout(()=>{
                        navigate('/login')
                    },1000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoding(false)
                    // email error message
                    if(errorMessage.includes("email")){
                        toast.error('email-already-in-use !', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                    // password error message
                    if(errorMessage.includes('auth/weak-password')){
                        toast.error('Password should be at least 6 characters !', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
            });
        }
        e.preventDefault()
    }

  return (
    <div className='grid items-center justify-center h-screen'>
        <div className='bg-black p-5 inline-block rounded-md'>
            <Hadding className={`text-white`} text={`Welcome to `} span={`chatting-app`}/>
            <form action="" onSubmit={handleSubmit}>
                <div className='my-5'>
                    <Paragraph className={`text-white text-xl`} text='Name :'/>
                    <input type="text"name='name'placeholder='Inter your name' onChange={handleChange} value={name} className='py-2 px-5 rounded-md w-full mt-2' />
                    {nameError&& <Paragraph className={`text-red-700 text-center`} text={nameError}/>}
                </div>
                <div className='my-5'>
                    <Paragraph className={`text-white text-xl`} text='Email :'/>
                    <input type="email"name='email'placeholder='Inter your email' onChange={handleChange} value={email} className='py-2 px-5 rounded-md w-full mt-2' />
                    {emailError&& <Paragraph className={`text-red-700 text-center`} text={emailError}/>}
                </div>
                <div className='my-5'>
                    <Paragraph className={`text-white text-xl`} text='Password :'/>
                    <input type="password"name='password'placeholder='Inter your password' onChange={handleChange} value={password} className='py-2 px-5 rounded-md w-full mt-2' />
                    {passwordError&& <Paragraph className={`text-red-700 text-center`} text={passwordError}/>}
                </div>
                <div>
                    {loding
                        ?<button className='w-full bg-primary py-2 rounded-md flex justify-center items-center hover:bg-transparent hover:text-primary border border-solid border-primary' type='submit'>
                            <Vortex
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                />
                        </button>
                        :<button className='w-full bg-primary py-2 rounded-md font-outfit font-bold text-xl hover:bg-transparent hover:text-primary border border-solid border-primary'>Sing Up</button>
                    }
                </div>
            </form>
            <Paragraph className='text-white mt-5' text={`Already have an account`} link='Sing In' path='/login'/>
            
        </div>
    </div>
  )
}

export default Singup