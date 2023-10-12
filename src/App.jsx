import React from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Singup from './pages/Singup';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from './components/root-layout/RootLayout';
import Message from './pages/Message';
import Notification from './pages/Notification';
import Setting from './pages/Setting';


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/'element={<Singup/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/' element={<RootLayout/>}>
          <Route path='/home'element={<Home/>}/>
          <Route path='/message' element={<Message/>}/>
          <Route path='/notification' element={<Notification/>}/>
          <Route path='/setting' element={<Setting/>}/>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
