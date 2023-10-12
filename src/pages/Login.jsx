import React, { useEffect, useState } from 'react'
import Hadding from '../components/hadding/Hadding'
import Paragraph from '../components/paragraph/Paragraph';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import { Vortex } from  'react-loader-spinner';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../slices/userSlice';
import Image from '../components/images/Image';
import googleImg from '../assets/google.png'
import facbook from '../assets/facbook.jpg'
import Button from '../components/button/Button';

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // recux user info
    let userData = useSelector((state)=>state.user.value);
    let navigate = useNavigate()
    let dispatch =useDispatch()

    useEffect(()=>{
        if(userData){
            navigate('/home')
        }else{
            navigate('/login')
        }
    },[])


    // all input value state
    const [inputValue,setInputValue]=useState({email:'',password:''});
    let {email,password}=inputValue
    // all error state
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    // loding state
    const [loding,setLoding]=useState(false)


    // handle input change
    const handleChange = (e) =>{
        setInputValue({...inputValue,[e.target.name]:e.target.value})

        if(e.target.name=='email'){
            setEmailError('')
        }
        if(e.target.name=='password'){
            setPasswordError('')
        }
    }

     // handle form submit
     const handleSubmit = (e) =>{
        if(!email){
            setEmailError('please inter your email')
        }
        if(!password){
            setPasswordError('please inter your password')
        }
        if(email && password){
            setLoding(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    setLoding(false)
                    // if(user.user.emailVerified){
                        dispatch(userInfo(user.user))
                        navigate('/home')
                        localStorage.setItem('user',JSON.stringify(user.user))
                    // }else{
                    //     toast.warn(' please your email varify !', {
                    //         position: "bottom-center",
                    //         autoClose: 5000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: "dark",
                    //     });
                    // }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage,errorCode);
                    if(errorMessage.includes('user')){
                        toast.error('🦄 invaild email !', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }else{
                        toast.error('🦄 invaild password !', {
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
                    console.log(errorMessage);
                    setLoding(false)
                });
        }
        e.preventDefault()
    }

    // handle google button
    const handleGoogle = () =>{
        signInWithPopup(auth, provider)
        .then((user)=>{
            localStorage.setItem('user',JSON.stringify(user.user))
            dispatch(userInfo(user.user))
            updateProfile(auth.currentUser, {
                displayName: fullName, 
                photoURL:  "https://firebasestorage.googleapis.com/v0/b/chatting-app-abc63.appspot.com/o/user.png?alt=media&token=338dfc90-7dd6-435e-80f6-2fe3cdf10f19"
            })
            navigate('/home')
                
        }).catch((error)=>{
            let errorMessage=error.message
            console.log(errorMessage);
        })

    }

  return (
    <div className='grid items-center justify-center h-screen'>
        <div className='bg-black p-5 inline-block rounded-md'>
            <Hadding className={`text-white`} text={`Welcome to `} span={`chatting-app`}/>
            <form action="" onSubmit={handleSubmit}>
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
                    <Paragraph className=' mb-5 cursor-pointer text-right text-primary' text='forger password' />
                {loding
                    ?<button className='w-full bg-primary py-2 rounded-md flex justify-center items-center' type='submit'>
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
                    :<Button className='w-full'  text='Sing In'/>
                    }
                    <Paragraph className='text-white mt-5' text={`Don’t have an account ?`} link='Sign up' path='/'/>
                </div>
            </form>
            <div>
            <p className='text-gray-400 text-center my-5 '>Or Sing in with</p>
            </div>
            <button onClick={handleGoogle}  className='w-full bg-primary py-2 border border-solid border-primary rounded-md font-outfit font-bold text-xl hover:bg-transparent hover:text-primary'><Image className='w-7 h-7 mx-auto inline-block' src={googleImg}/> continue with google</button>
            <button className='w-full bg-primary py-2 mt-5 border border-solid border-primary rounded-md font-outfit font-bold text-xl hover:bg-transparent hover:text-primary'><Image className='w-7 h-7 mx-auto inline-block' src={facbook}/> continue with facbook</button>
        </div>
    </div>
  )
}

export default Login